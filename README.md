# PowerSync React Native + Tinybase Example

## Overview

Demo app using React Native + Tinybase to create a simple application.

NB: Supabase is used for the backend of this application. See [PowerSync <> Supabase](https://docs.powersync.com/integration-guides/supabase-+-powersync) for more details on how to setup PowerSync and Supabase to work together.

## Getting Started

### Set up PowerSync + Supabase

Set up Supabase by pasting the contents of `supabase.sql` into the Supabase SQL editor.

Set up PowerSync by copying the contents of `sync-rules.yaml` to your PowerSync project's sync rules.

### Set up your environment

In the repo directory, use [pnpm](https://pnpm.io/installation) to install dependencies:

```bash
pnpm install
pnpm build:packages
```

Then switch into the demo's directory:

```bash
cd demos/react-native-supabase-tinybase
```

Set up the Environment variables: Copy the `.env` file:

```bash
cp .env .env.local
```

And then edit `.env.local` to insert your credentials for Supabase.

### Run the project

Run on iOS

```sh
pnpm ios
```

Run on Android (see [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment?platform=android) to allow you to develop with Android emulators and iOS simulators).

```sh
pnpm android
```
