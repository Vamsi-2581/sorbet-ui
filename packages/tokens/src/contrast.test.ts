import { describe, expect, it } from 'vitest';

import {
  backgrounds,
  colorPalette,
  colorScaleForMode,
  darkModeColorPalette,
  textColors,
  textColorsForMode,
  type ColorScale,
  type SemanticColor,
} from './colors';
import { sorbetPalette } from './palette';

// WCAG 2.x relative luminance and contrast ratio.
// https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
type Rgb = [number, number, number];

const WHITE = '#ffffff';
/** WCAG 2.1 AA minimum for normal-size text (1.4.3). */
const AA_TEXT = 4.5;

function parseColor(value: string): { rgb: Rgb; alpha: number } {
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = hex[1];
    return {
      rgb: [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16)) as Rgb,
      alpha: 1,
    };
  }
  const rgba = value.match(/^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\s*\)$/);
  if (rgba) {
    return {
      rgb: [Number(rgba[1]), Number(rgba[2]), Number(rgba[3])],
      alpha: Number(rgba[4]),
    };
  }
  throw new Error(`Unsupported color format: ${value}`);
}

/** Composites a possibly translucent color over an opaque backdrop. */
function flatten(value: string, backdrop: Rgb): Rgb {
  const { rgb, alpha } = parseColor(value);
  return rgb.map((c, i) => c * alpha + backdrop[i] * (1 - alpha)) as Rgb;
}

function luminance(rgb: Rgb): number {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Contrast of text on a background, both composited over the page color. */
function contrast(foreground: string, background: string, page = WHITE): number {
  const bg = flatten(background, parseColor(page).rgb);
  const fg = flatten(foreground, bg);
  const [hi, lo] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const semanticColors = Object.keys(colorPalette) as SemanticColor[];

describe('contrast helper', () => {
  it('matches known WCAG values', () => {
    expect(contrast('#000000', WHITE)).toBeCloseTo(21, 5);
    expect(contrast('#ffffff', WHITE)).toBeCloseTo(1, 5);
    // The audited failure this suite guards against: white on the old primary main.
    expect(contrast('#ffffff', '#0ea5e9')).toBeCloseTo(2.77, 2);
  });
});

// These pairs cover the light theme (white page). No single shade reaches 4.5:1 on
// both white and near-black, so dark mode uses its own scale (tested below).
describe.each(semanticColors)('%s tokens on a white page (WCAG AA text)', (name) => {
  const scale: ColorScale = colorPalette[name];

  it('solid: contrastText on main', () => {
    expect(contrast(scale.contrastText, scale.main)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('solid hover: contrastText on dark', () => {
    expect(contrast(scale.contrastText, scale.dark)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('outlined, plain and link: main on white', () => {
    expect(contrast(scale.main, WHITE)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('outlined and link hover: dark on white', () => {
    expect(contrast(scale.dark, WHITE)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('soft: dark on the alpha12 tint, and on the alpha20 hover tint', () => {
    expect(contrast(scale.dark, scale.alpha12)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrast(scale.dark, scale.alpha20)).toBeGreaterThanOrEqual(AA_TEXT);
  });
});

// Dark mode. Components switch to darkModeColorPalette through colorScaleForMode.
// Known gaps, not asserted here: solid fills (white on most 500 shades is below
// 4.5:1), neutral `main` as text (3.75:1 on the page), and `main` as text on the
// lighter paper surface for secondary, danger and neutral.
const DARK_PAGE = backgrounds.dark.default;
const DARK_PAPER = backgrounds.dark.paper;

describe('colorScaleForMode', () => {
  it.each(semanticColors)('returns the light-theme scale for %s outside dark mode', (name) => {
    expect(colorScaleForMode(name, false)).toBe(colorPalette[name]);
  });

  it.each(semanticColors)('returns the dark-mode scale for %s in dark mode', (name) => {
    expect(colorScaleForMode(name, true)).toBe(darkModeColorPalette[name]);
  });
});

describe('textColorsForMode', () => {
  it('returns the light text colors outside dark mode and the dark ones in dark mode', () => {
    expect(textColorsForMode(false)).toBe(textColors.light);
    expect(textColorsForMode(true)).toBe(textColors.dark);
  });

  // Checkbox, Radio and Switch labels use `primary`; unselected ToggleButton text and
  // the Slider min/max labels use `secondary`.
  it.each(['primary', 'secondary'] as const)(
    'dark %s text reaches 4.5:1 on the dark page and on paper',
    (role) => {
      const color = textColorsForMode(true)[role];
      expect(contrast(color, DARK_PAGE, DARK_PAGE)).toBeGreaterThanOrEqual(AA_TEXT);
      expect(contrast(color, DARK_PAPER, DARK_PAPER)).toBeGreaterThanOrEqual(AA_TEXT);
    }
  );
});

describe.each(semanticColors)('%s tokens on a dark page', (name) => {
  const scale: ColorScale = darkModeColorPalette[name];

  it('outlined borders and icons: main reaches 3:1 on the page and on paper', () => {
    expect(contrast(scale.main, DARK_PAGE, DARK_PAGE)).toBeGreaterThanOrEqual(3);
    expect(contrast(scale.main, DARK_PAPER, DARK_PAPER)).toBeGreaterThanOrEqual(3);
  });

  it('soft: light on the alpha20 tint', () => {
    expect(contrast(scale.light, scale.alpha20, DARK_PAGE)).toBeGreaterThanOrEqual(AA_TEXT);
  });

  it('is lighter than the light-theme main, so text on dark surfaces gains contrast', () => {
    expect(contrast(scale.main, DARK_PAGE, DARK_PAGE)).toBeGreaterThanOrEqual(
      contrast(colorPalette[name].main, DARK_PAGE, DARK_PAGE)
    );
  });
});

describe.each(semanticColors.filter((name) => name !== 'neutral'))(
  '%s main as text on the dark page (WCAG AA text)',
  (name) => {
    it('reaches 4.5:1', () => {
      expect(
        contrast(darkModeColorPalette[name].main, DARK_PAGE, DARK_PAGE)
      ).toBeGreaterThanOrEqual(AA_TEXT);
    });
  }
);

// darkTheme in @sorbet-ui/theme sets MUI's primary, success, warning and error `main`
// to these 500 shades.
describe.each(['primary', 'success', 'warning', 'danger'] as const)(
  'MUI dark theme palette %s on the dark default background',
  (name) => {
    it('500 shade reaches 4.5:1', () => {
      const page = sorbetPalette.neutral[900];
      expect(contrast(sorbetPalette[name][500], page, page)).toBeGreaterThanOrEqual(AA_TEXT);
    });
  }
);

// sorbetPalette feeds the MUI theme (lightTheme/darkTheme), where MUI uses `main` as
// text for outlined and text buttons, links and focused labels.
describe.each(Object.keys(sorbetPalette) as (keyof typeof sorbetPalette)[])(
  'MUI theme palette %s on a white page',
  (name) => {
    it('main on white', () => {
      expect(contrast(sorbetPalette[name].main, WHITE)).toBeGreaterThanOrEqual(AA_TEXT);
    });
  }
);
