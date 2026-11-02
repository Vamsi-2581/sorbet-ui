import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  AppBar,
  Toolbar,
  ThemeProvider,
  CssBaseline,
  IconButton,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Brightness4 as DarkIcon,
  Brightness7 as LightIcon,
  Star as StarIcon,
  Code as CodeIcon,
  Palette as PaletteIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { lightTheme, darkTheme } from '@sorbet-ui/theme';
import {
  Button as SorbetButton,
  Card as SorbetCard,
  Badge,
  Chip as SorbetChip,
  Avatar as SorbetAvatar,
  Alert,
  Progress,
  Rating,
} from '@sorbet-ui/react';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{ bgcolor: 'background.paper' }}
          >
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                Sorbet UI
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button color="inherit" href="https://sorbet-ui.vercel.app" target="_blank">
                  Storybook
                </Button>
                <IconButton
                  color="inherit"
                  href="https://github.com/tahmidbintaslim/sorbet-ui"
                  target="_blank"
                >
                  <GitHubIcon />
                </IconButton>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                  {mode === 'dark' ? <LightIcon /> : <DarkIcon />}
                </IconButton>
              </Stack>
            </Toolbar>
          </AppBar>

          {/* Hero Section */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography
                    component="h1"
                    variant="h2"
                    color="text.primary"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    Material UI,
                    <br />
                    but softer
                  </Typography>
                  <Typography variant="h5" color="text.secondary" paragraph>
                    Soft, ghost and plain variants for 26 Material UI v7 components, with one variant,
                    color and size API and light and dark themes.
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      href="https://sorbet-ui.vercel.app"
                      target="_blank"
                      sx={{ borderRadius: 2, px: 3, py: 1.5 }}
                    >
                      Browse components
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      href="https://github.com/tahmidbintaslim/sorbet-ui"
                      target="_blank"
                      startIcon={<GitHubIcon />}
                      sx={{ borderRadius: 2, px: 3, py: 1.5 }}
                    >
                      Star on GitHub
                    </Button>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <SorbetCard variant="outlined" sx={{ p: 3, width: '100%', maxWidth: 400 }}>
                      <Stack spacing={2}>
                        <SorbetButton variant="solid" color="primary" fullWidth>
                          Primary Button
                        </SorbetButton>
                        <SorbetButton variant="soft" color="success" fullWidth>
                          Success Button
                        </SorbetButton>
                        <SorbetButton variant="outlined" color="warning" fullWidth>
                          Warning Button
                        </SorbetButton>
                      </Stack>
                    </SorbetCard>
                    <SorbetCard
                      variant="soft"
                      color="secondary"
                      sx={{ p: 3, width: '100%', maxWidth: 400 }}
                    >
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        <SorbetChip variant="solid" color="primary" label="React" />
                        <SorbetChip variant="soft" color="success" label="TypeScript" />
                        <SorbetChip variant="outlined" color="warning" label="MUI v7" />
                        <SorbetChip variant="ghost" color="info" label="Dark mode" />
                      </Stack>
                    </SorbetCard>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Features Section */}
          <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 6 }}
              >
                Why Sorbet UI?
              </Typography>
              <Grid container spacing={4}>
                {[
                  {
                    icon: <PaletteIcon sx={{ fontSize: 40 }} />,
                    title: 'Shared variants',
                    description:
                      'Solid, soft, outlined, ghost and plain on every component. Button adds dash and link.',
                  },
                  {
                    icon: <CodeIcon sx={{ fontSize: 40 }} />,
                    title: 'Still Material UI',
                    description:
                      'Each component wraps its MUI counterpart, so MUI props, the sx prop and your theme keep working.',
                  },
                  {
                    icon: <SpeedIcon sx={{ fontSize: 40 }} />,
                    title: 'TypeScript',
                    description:
                      'Written in strict TypeScript, with exported prop types for every component.',
                  },
                  {
                    icon: <DarkIcon sx={{ fontSize: 40 }} />,
                    title: 'Light and dark themes',
                    description:
                      'lightTheme and darkTheme for the MUI ThemeProvider, built from the Sorbet UI tokens.',
                  },
                ].map((feature, index) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        p: 3,
                        borderRadius: 2,
                      }}
                      elevation={0}
                      variant="outlined"
                    >
                      <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 'bold' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Components Showcase */}
          <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
            <Container maxWidth="lg">
              <Typography
                component="h2"
                variant="h3"
                align="center"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 'bold', mb: 6 }}
              >
                Component Showcase
              </Typography>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SorbetCard variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Buttons
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <SorbetButton variant="solid" color="primary" size="sm">
                        Solid
                      </SorbetButton>
                      <SorbetButton variant="soft" color="success" size="sm">
                        Soft
                      </SorbetButton>
                      <SorbetButton variant="outlined" color="warning" size="sm">
                        Outlined
                      </SorbetButton>
                      <SorbetButton variant="ghost" color="danger" size="sm">
                        Ghost
                      </SorbetButton>
                    </Stack>
                  </SorbetCard>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SorbetCard variant="soft" color="secondary" sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Form Elements
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Rating value={4.5} readOnly size="sm" />
                        <Typography variant="body2">4.5 stars</Typography>
                      </Stack>
                      <Progress value={75} color="primary" />
                      <Alert color="info" sx={{ py: 1 }}>
                        This is an info alert
                      </Alert>
                    </Stack>
                  </SorbetCard>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SorbetCard variant="outlined" sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Data Display
                    </Typography>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <SorbetAvatar src="https://i.pravatar.cc/40" />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          John Doe
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Software Engineer
                        </Typography>
                      </Box>
                      <Badge content="3" color="danger">
                        <SorbetButton variant="ghost" size="sm">
                          Messages
                        </SorbetButton>
                      </Badge>
                    </Stack>
                  </SorbetCard>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <SorbetCard variant="soft" color="primary" sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      Navigation
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <SorbetChip variant="solid" color="primary" label="Home" />
                      <SorbetChip variant="outlined" color="secondary" label="About" />
                      <SorbetChip variant="soft" color="success" label="Contact" />
                      <SorbetChip variant="ghost" color="info" label="Blog" />
                    </Stack>
                  </SorbetCard>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Footer */}
          <Box sx={{ py: 6, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Sorbet UI
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    React components built on Material UI v7. Open source under the MIT license.
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      color="inherit"
                      href="https://github.com/tahmidbintaslim/sorbet-ui"
                      target="_blank"
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton
                      color="inherit"
                      href="https://github.com/tahmidbintaslim/sorbet-ui/stargazers"
                      target="_blank"
                      aria-label="Star Sorbet UI on GitHub"
                    >
                      <StarIcon />
                    </IconButton>
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Links
                  </Typography>
                  <Stack spacing={1}>
                    <Button color="inherit" href="https://sorbet-ui.vercel.app" target="_blank">
                      Storybook
                    </Button>
                    <Button
                      color="inherit"
                      href="https://github.com/tahmidbintaslim/sorbet-ui"
                      target="_blank"
                    >
                      GitHub
                    </Button>
                    <Button
                      color="inherit"
                      href="https://github.com/tahmidbintaslim/sorbet-ui/blob/main/DOCUMENTATION.md"
                      target="_blank"
                    >
                      Documentation
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary" align="center">
                  © 2026 Tahmid Bin Taslim Rafi and Sorbet UI contributors. MIT license.
                </Typography>
              </Box>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
