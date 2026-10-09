# Publish after you create the repo

Create an **empty** public repo: **`portsmouth-badminton-hub`**

Then run these commands **inside this folder** (`portsmouth-badminton-hub/`):

```bash
git init
git add .
git commit -m "Initial commit: Portsmouth Badminton Hub"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portsmouth-badminton-hub.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username (e.g. `jerilkuruvilawork`).

Enable **Pages** → source **GitHub Actions**. The site should appear at:

`https://YOUR_USERNAME.github.io/portsmouth-badminton-hub/`

## If this folder already lives inside `pompeysmashers`

Use a **subtree push** from the parent repo instead:

```bash
cd /path/to/pompeysmashers
git subtree split --prefix=portsmouth-badminton-hub -b portsmouth-badminton-hub-main
git push https://github.com/YOUR_USERNAME/portsmouth-badminton-hub.git portsmouth-badminton-hub-main:main
```
