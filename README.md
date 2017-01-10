# Desktop App
The Zebra desktop app revamp! Get setup below

#### Prereqs
  1. You need to have [nvm](https://github.com/creationix/nvm) installed on your system
  1. Add this project to `synced_projects` in `vagrant/local_settings.rb`.

#### Setup

```bash
git clone git@github.com:insurancezebra/frontend.git
cd frontend
nvm install
nvm use
npm install
npm start
```
# SCSS

Import only partials from Bootstrap that aren't modified in any way. If you change anything on a Bootstrap partial duplicate it and bring it in to own SCSS partials and change how it's imported from `style.scss`.