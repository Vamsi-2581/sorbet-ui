/**
 * Sorbet UI Animation System
 *
 * Transitions, keyframes, and animation presets
 */

// Transition durations
export const duration = {
  instant: '0ms',
  fastest: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '400ms',
  slowest: '500ms',
} as const;

// Transition timing functions (easings)
export const easing = {
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // More expressive easings
  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  // Bounce and elastic
  easeOutBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  easeInBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
  easeInOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  // Spring-like
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

// Transition property presets
export const transitionProperty = {
  none: 'none',
  all: 'all',
  default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  colors: 'background-color, border-color, color, fill, stroke',
  opacity: 'opacity',
  shadow: 'box-shadow',
  transform: 'transform',
  size: 'width, height',
} as const;

// Pre-built transitions for components
export const transitions = {
  // Quick feedback transitions
  button: `all ${duration.fast} ${easing.easeInOut}`,
  buttonHover: `all ${duration.normal} ${easing.easeOut}`,

  // Input transitions
  input: `border-color ${duration.fast} ${easing.easeInOut}, box-shadow ${duration.fast} ${easing.easeInOut}`,
  inputFocus: `all ${duration.normal} ${easing.easeOut}`,

  // Overlay transitions
  fade: `opacity ${duration.normal} ${easing.easeInOut}`,
  fadeIn: `opacity ${duration.slow} ${easing.easeOut}`,
  fadeOut: `opacity ${duration.fast} ${easing.easeIn}`,

  // Scale transitions
  scale: `transform ${duration.normal} ${easing.spring}`,
  scaleIn: `transform ${duration.slow} ${easing.easeOutBack}`,

  // Slide transitions
  slide: `transform ${duration.slow} ${easing.easeInOut}`,
  slideIn: `transform ${duration.slow} ${easing.easeOut}`,
  slideOut: `transform ${duration.fast} ${easing.easeIn}`,

  // Color transitions
  color: `color ${duration.fast} ${easing.easeInOut}`,
  background: `background-color ${duration.fast} ${easing.easeInOut}`,

  // Combined transitions
  interactive: `all ${duration.fast} ${easing.easeInOut}`,
  smooth: `all ${duration.normal} ${easing.easeInOut}`,
  snappy: `all ${duration.faster} ${easing.easeOut}`,
} as const;

// Keyframe animations (as CSS strings for use with styled-components or emotion)
export const keyframes = {
  // Fade animations
  fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `,
  fadeOut: `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `,

  // Scale animations
  scaleIn: `
    @keyframes scaleIn {
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
  `,
  scaleOut: `
    @keyframes scaleOut {
      from { transform: scale(1); opacity: 1; }
      to { transform: scale(0.95); opacity: 0; }
    }
  `,

  // Slide animations
  slideInFromTop: `
    @keyframes slideInFromTop {
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideInFromBottom: `
    @keyframes slideInFromBottom {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `,
  slideInFromLeft: `
    @keyframes slideInFromLeft {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,
  slideInFromRight: `
    @keyframes slideInFromRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `,

  // Bounce animations
  bounce: `
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `,
  bounceIn: `
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); opacity: 1; }
    }
  `,

  // Pulse animations
  pulse: `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `,
  ping: `
    @keyframes ping {
      75%, 100% {
        transform: scale(2);
        opacity: 0;
      }
    }
  `,

  // Spin animations
  spin: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `,

  // Shake animation (for errors)
  shake: `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
      20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
  `,

  // Skeleton loading animation
  shimmer: `
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
  `,
} as const;

// Animation presets for components
export const animationPresets = {
  spin: 'spin 1s linear infinite',
  ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  bounce: 'bounce 1s infinite',
  fadeIn: 'fadeIn 200ms ease-out',
  fadeOut: 'fadeOut 150ms ease-in',
  scaleIn: 'scaleIn 200ms ease-out',
  scaleOut: 'scaleOut 150ms ease-in',
  slideInFromTop: 'slideInFromTop 300ms ease-out',
  slideInFromBottom: 'slideInFromBottom 300ms ease-out',
  slideInFromLeft: 'slideInFromLeft 300ms ease-out',
  slideInFromRight: 'slideInFromRight 300ms ease-out',
  shake: 'shake 0.5s ease-in-out',
  shimmer: 'shimmer 2s infinite linear',
} as const;

export type Duration = typeof duration;
export type Easing = typeof easing;
export type TransitionProperty = typeof transitionProperty;
export type Transitions = typeof transitions;
export type Keyframes = typeof keyframes;
export type AnimationPresets = typeof animationPresets;
