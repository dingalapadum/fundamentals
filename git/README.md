# GIT CHEATSHEET-TUTORIAL

There are many git-cheatsheets out there - this happens to be the one I wrote. It is supposed to be a mix between a cheatsheet and a tutorial. Just go from top to bottom through it for the 'tutorial' version. You are expected to think along a bit and create, modify, etc. some files in your project as needed for all the tutorial to make sense. It is assumed that you already have git installed. Arguments that need to be provided by you are written as ``<arg>``.


Git is a version control system (vcs). The purpose of a version control system is to let you track the changes done to a project. It enables us to see who did what and when. 
<hr>

## Initalize git repository
```
    git init
# You will get a folder .git/ which contains all the data that git uses to function. Among those there is a configfile.
```
<hr>

## Configuration
```
# Set git user.name and user.email for system wide git-configuration:
    git config --global user.name <yourName>
    git config --global user.email <you@yourdomain.example.com>
# Replace --global with--localif you want only this repo to be configured (works only if you initialized the repo). Local config overrides global config

# See git a variable of the config
    git config user.name

# see _all_ git variables.
    git config -l 

# You can also add --local or --global to only see the corresponding config - the merge of both configs is applied.
```
Global properties are written to ``~/.gitconfig``. Local properties are stored in ``.git/config``. You could also write directly to these files respectively. I encourage you to have a look at them.
<hr>

## Index and committing

A basic 'unit of change' is called a ``commit`` - a ``commit`` is a set of changes, with some meta-data like an id, author a parent-commit to name a few. A commit  always has a _single parent commit_ (except for the first one which has none of course).

The ``index`` is where we put the files that you want to include in your next commit.
```
# stage files to 'index'.
    git add <file1> <file2> <file3>
    git add . # add all files that changed
    
# see what is in the index (staged) and what changes are made but not staged. Probably one of the commands I use the most
    git status

# remove a file from the index:
    git reset file
    git reset 
# remove all files from index
# will not revert the changes but only unstage (remove from the index)

# dicard local changes - i,e, undo changes in <file>
    git checkout <file>


# store content of the index to a commit
    git commit
# An editor will pop up and you have to provide a commit message:
# first line is the commit message
# blank line then complete description of the commit can follow

# short version
    git commit -m "some commit message"

# change commit message of last commit:
    git commit --amend

# undo last commit and get the put the changes of that commit back into the index
    git reset HEAD~
```
<hr>

## Inspecting changes and commit history
```
# see diffs:
    git diff --cached # (same as --staged) index vs repo (what would be commited)
    git diff # current state vs index
    git diff <commit-hash> # <commit-hash> vs current state
    git diff <commit-hash-1> <commit-hash-2> # <commit-hash-1> vs <commit-hash-2>

# inspect commit - a commit us uniquely identifiable by it's hash
    git show <commit-hash>
# you don't need to provide the entire hash. It suffices to provide enough of the hash to make it uniquely identifiable (usually the first 5 characters should be enough).

# view history of the commits and some formatting options
    git log
    git log --pretty=oneline
    git log --pretty=format:"%h - %an, %ar : %s"
    git log --pretty=format:"%h %s" --graph
# %h hash
# %s subject

# personally I use
    git log --format='%Cred %h %Cblue %<(12,trunc)%an %cd %Creset %s'
# and I have an alias for this 'git lg'

# sometimes
    git log --format='%Cred %<(5,trunc)%h %Creset %s %d' --graph --all
# when I need to see other branches too. (alias 'git lgga')

# see complete diffs at each step 
    git log -p
```

<hr>

## Branches and HEAD
Git allows us to have diverge from the 'main chain of development' with the concept of a _branch_.
<details>
<summary>
Expand this for some addtional information on branches
</summary>
<hr>
The 'main' branch is usually called 'master' (similar to the 'trunk' in svn),
We usually use a new branch when we want to start with a new change of which we are not sure yet if we want to actually have it on the master. 

There are different 'philosophies' on how branches should be managed and is a whole topic on its own - won't be discussed here (google for something like 'git workflows' to read more about this).

I suggest that apart from 'a commit-chain diverging from the master', you think of branches as a pointer that references the current chain of development with some additional meta-info (like where this chain of commits diverged from some other branch). While committing on the branch, this reference will 'move along'.


A picture is worth a thousand words:

\* are commits

```
* a699e57 (HEAD -> master)
* 525a8fc
* c23a735
| * c433b6f (anotherbranch)
| * 1815b86
| * 3252365
| * 15ddd47
|/
* 23f6704
* 5149ed4
* 01de1c2
* b7293c4
```
(was produced with: ``git log --format='%h %<(5,trunc) %Creset %d' --graph --all``)
Observe the following things in the graph above:
- The commit history goes from bottom to top
- The branch ``anotherbranch`` diverged from the master after commit ``23f6704``
- The first commit on ``anotherbranch`` after diverging from the master is ``15ddd47``
- The branch ``anotherbranch`` currently is at ``c433b6f``
- The ``HEAD`` currently follows the ``master`` branch.
- The first commit on ``master`` after diverging from the master is ``c23a735``
- The branch ``master`` currently is at ``a699e57``
<hr>
</details>

```
# Create a new branch 'local-branch' and switch to it.
    git checkout -b local-branch
# At this point the branch will point to the current commit your HEAD was pointing to

# List all branches
    git branch #local
    git branch -a #all

# Switch to an existing branch (master in this example)
    git checkout master

# Rename the current branch (locally only)
    git branch -m <oldname> <newname>
 
# Delete branch
    git branch -d <branchToDelete>
# you are not allowed to delete the branch if it has changes that are not tracked by

# If you still want to delete that branch, you need to 'force' delete it:
    git branch -D <branchToDelete> 
```
The ``HEAD`` is a pointer that references the commit where we _currently_  at and thereby defines the parent of our next commit. 

<details>
<summary>
Expand this for some addtional information on HEAD
</summary>

After commiting, the ``HEAD`` will move along and reference the new commit.
The ``HEAD`` follows (is attached to) the branch we are working on and we can use it to reference commits _relative_ to our current position. It is also possible to detach the ``HEAD`` from any branch and creating the branch later.
</details>


```
# use HEAD~<nr> instead of commit hash
# HEAD~<nr> refers to the commit <nr> of commits back, i.e. HEAD~0 is last commit and HEAD~3 is the commit 4 commits back

# see content of last commit
    git show HEAD

# show commit before last commit
    git show HEAD~1
# go with HEAD~2, HEAD~3, etc.. to see contents of previous commit
```

The ``checkout`` command is overloaded and can also be used to 'jump' to a specific commit
```
# jump to a specific commit
    git checkout <hash>
# This moves the HEAD and makes that the HEAD now points to the commit with id <hash>. This detaches the HEAD from the branch you were working on. If you commit now, these changes won't be tracked by any branch - but you are free to know create a new branch from here
```
<hr>


# Random selection of recurring Tasks

The remainder of this inroduction is not so much a tutorial anymore, but rather a collection of some recurring tasks I found myself googling for over and over again - this is the part which is more cheatsheet than tutorial

## Accepting changes from the master ("updating your branch")
So you are working on some feature-branch and you want to get the changes from master into your branch without a merge commit, but basically moving the commits from your branch to the top of master - this will then allow to merge your pull-request into master via fast-forward

```
# accept changes from master
    git chechout master
    git pull
    git checkout <your-feature-branch>
    git rebase master
```

You might get conflicts during this step. You basically will need to solve the conflict (i.e. put the conflicting files in the state you want to have in the end), and continue rebasing (you should see some instructions in the terminal if this happens).

## Manipulating (old) commits

Every now and then I want to make a change in a commit I already did (maybe change the message or add another file or make a modification in antoher way than what I did in that commit). Or sometime simply discard old commits alltogether.

```
# uncommit last 4 commits but keep changes staged
    git reset --soft HEAD~4

# uncommit last commit and discard all the changes
    git reset --hard HEAD~

# Rewording, squashing and others: with the command
    git rebase -i HEAD~4
# you'll get into a menu showing your last 4 commits
# you choose which of these commit you want to modify - like editing the commit-message or squashing commits together. 
# follow instructions which appear in the menu:
# For instance changing "pick" to "reword", then save -> you will be prompted to change
# the message of those commits
# Note that you if want to squash commits, you must "pick" at least one where the other commits will be squashed into.
```
## Manipulating the _content_ of (old) commits

```
Change stuff in an older commit. In this example wrongly commited target:
    git checkout <hash>  
#this will detach your head (i.e. you are not on your branch anymore)
  
# do some changes: example removing the folder target
    git rm -r target
# add some file
    git add bla.txt
  
    git commit --amend -m "<definitiv commit message>"
# omit '-m <...>' if you want to use the same commit message as before
    git rebase --onto HEAD <hash> <branch-name>
# the same hash as the one in the beginning
# branch-name is the one you left when the head got detachted
```
## Aliases

Git allows you to create custom aliases to safe you some typing.

You create an alias with:
```
    git config --global alias.st status
```

After doing this you can just write:
```
    git st
```
instead of
```
    git status
```

You can see your aliases in your ``.gitconfig`` and of course you can just write them directly in that file. Here are some aliases I how they appear in my ``.gitconfig``:

```
[alias]
        # short common commands (these are widely used)
        co = checkout
        br = branch
        st = status

        # different log pretty printers
        lg = "log --format='%Cred %h %Cblue %<(12,trunc)%an %cd %Creset %s'"
        lgg = "log --format='%Cred %h %Cblue %<(12,trunc)%an %Creset %s' --graph"
        lgga = "log --format='%Cred %<(5,trunc)%h %Creset %s %d' --graph --all"
        lgmf = "log --name-status --reverse --pretty='%Cred%an %h %s %Cgreen'"

        # like "git diff" but only showing filenames
        dfiles = "diff --name-only"

        # show all available aliases
        alias = "config --get-regexp '^alias\\.'"

        # like "git show" but only show the files that where modified without other details
        showfiles = "diff-tree --no-commit-id --name-only -r"
```

<hr>

# Where to go next, where to get more help
There are a pletora of other resources to learn more about git out there

- ``git help`` to see some common and useful commands
- ``git help <command>`` for additional info about a specific command
- ``man git`` - because reading man-pages is always a good thing :)
- In your terminal type ``man gittutorial`` for a good tutorial which also emphazises more the 'collaboration' part compared to this guide.
- Google for "git workflows" for more information about different ways to use git in a team
- Explore the ``.git`` folder and the files in here to get a more in depth understanding of how git keeps track of the current state.
