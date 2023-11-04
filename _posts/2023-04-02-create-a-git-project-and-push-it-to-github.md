---
layout: post
title: "Create a Git repo and push it to Github"
author: 'Rémi Debord'
comments: true
tipue_search_active: true
---
As i'm struggling with it each time, here is how to proceed from a fresh install.

Create ssh key
```bash
# SHA256 key generation
ssh-keygen -C "remidebord@hotmail.fr"
# Change rights access, else ssh-add will complain about it
chmod 400 ~/.ssh/id_rsa.pub
# Start ssh-agent
ssh-agent bash
# Add private key to authentication agent
ssh-add ~/.ssh/id_rsa
```
Add it to your github account (Settings > SSH and GPG keys > New SSh key).

Now, create the repo on github (Your repositories > New, ex: remidebord/Ethereum-scan) and rename the main branch "master" instead of "main".

Back on the prompt, go to your project folder and create (initialize) a git repo
```bash
cd ~/scripts
git init
```

Add git remote repo path (ex: Ethereum-scan)
```bash
git remote add origin git@github.com:remidebord/Ethereum-scan.git
```

Could be checked with
```bash
red@DESKTOP-QD37HPC:~/scripts$ git remote -v
origin  git@github.com:remidebord/Ethereum-scan.git (fetch)
origin  git@github.com:remidebord/Ethereum-scan.git (push)
``` 

Sync with remote repo
```bash
git pull origin master
``` 

Add your files, commit and push
```bash
git add *
git commit -m "Add scripts"
git push --set-upstream origin master
```
The next times you can simply use after the commit creation/amend
```bash
git push
```

### References
- [Github - Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Github - Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [Github - Managing remote repositories](https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories)
