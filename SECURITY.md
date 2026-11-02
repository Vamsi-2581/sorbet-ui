# Security policy

## Supported versions

Sorbet UI has not been published to npm yet. Security fixes land on the `main` branch. After the first release, fixes go into the latest published minor version.

## Reporting a vulnerability

Please do not report security problems in public issues or pull requests.

Report them privately through GitHub instead:

1. Open the repository's [Security tab](https://github.com/tahmidbintaslim/sorbet-ui/security).
2. Choose **Report a vulnerability** ([direct link](https://github.com/tahmidbintaslim/sorbet-ui/security/advisories/new)).

This creates a private security advisory that only you and the maintainer can see.

Please include:

- the affected package (`@sorbet-ui/react`, `@sorbet-ui/theme`, `@sorbet-ui/tokens` or `@sorbet-ui/core`) and the version or commit
- steps to reproduce, or a small proof of concept
- the impact you expect

## What to expect

Sorbet UI is maintained by one person, so there is no guaranteed response time. You will get a reply in the advisory thread. The fix and any public disclosure are coordinated with you there, and you are credited in the advisory unless you prefer not to be.

## Scope

Sorbet UI is a client-side React component library. It does not handle authentication, storage or network requests.

In scope:

- a component that renders props or children in an unsafe way (for example, HTML injection)
- a vulnerable dependency that Sorbet UI pulls in and that affects its users
- problems in this repository's build and release workflows

Out of scope:

- vulnerabilities in your own application code, including what you pass to Sorbet UI components
- issues in Material UI, Emotion or React themselves (report those upstream)
