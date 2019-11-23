# GIT CHEATSHEET

There are many git-cheatsheets out there - this happens to be the one I wrote. It is supposed to be a mix between a cheatsheet and a tutorial. Just go from top to bottom through it for the 'tutorial' version. You are expected to think along a bit and create, modify, etc. some files in your project as needed for all the tutorial to make sense. Arguments that need to be provided by you are written as ``<arg>``.


Git is a version control system (vcs). The purpose of a version control system is to let you track the changes done to a project. It enables us to see who did what and when. The basic unit of change is a _commit_, Commits have some meta-data like an 'id' (a hash), author, etc.. plus the set of changes. A commit  always has a _single parent commit_ (except for the first one which has none of course).

## Initalize git repository
```
git init
# You will get a folder .git/which contains all the data that git uses to function. Among those there is configfile.
```

## Configuration
```
# Set git user.name and user.email for system wide git-configuration:
git config --global user.name <yourName>
git config --global user.email <you@yourdomain.example.com>


# Replace --global with--localif you want only this repo to be configured (works only if you initialized the repo). 
# Local config overrides global config

# See git config
git config user.name
git config -l 
# see _all_ git variables. You can also add --local or --global to only
see the corresponding config - the merge of both configs is applied.
```
Global properties are written to ``~/.gitconfig``. Local properties are stored in ``.git/config``. You could also write directly to these files respectively. I encourage you to have a look at them.

## Index and committing

A 'unit' of change is called a ``commit`` - a ``commit`` is a set of changes, with some meta-data like an id, author a parent-commit to name a few. 

The index is where we put the files that you want to include in your next commit.
```
# stage files to 'index'.
git add <file1> <file2> <file3>
git add . # add all files that changed

# see what is in the index (staged) and what changes are made but not staged.
git status

# remove a file from the index:
git reset file
git reset 
# remove all files from index
# will not revert the changes but only unstage (remove from the index)

# dicard local changes
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

## Branches and HEAD
Git allows us to have diverge from the 'main chain of development' with the concept of a _branch_. The 'main' branch is usually called 'master' (similar to the 'trunk' in svn),
<details>
<summary>We usually use a new branch when we want to start with a new change of which we are not sure yet if we want to actually have it on the master. 
</summary>
There are different 'philosophies' on how branches should be managed and is a whole topic on its own - won't be discussed here (google for something like 'git workflows' to read more about this).
</details>

I suggest that apart from 'a commit-chain diverging from the master', you think of branches as a pointer that references the current chain of development with some additional meta-info (like where this chain of commits diverged from some other branch). While committing on the branch, this reference will 'move along'.

The ``HEAD`` is a pointer that shows where _we_ currently stand. We can use it to reference commits _relative_ to our position.

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

```
# Create a new branch 'local-branch' and switch to it
git checkout -b local-branch

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


# TODO: continue here

As just mentioned, we can use the ``HEAD`` to check commits relative to our current position.

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
# This moves the HEAD and makes that the HEAD now points to the commit with id <hash>

```

```
# accept changes from master
git rebase master


Modifying old commits
# change commit message of old commit:
git rebase -i HEAD~4
# assumig you want to edit one of the last 4 commit-messages
# follow instructions which then appear:
# change "pick" to "reword". Save -> you will be prompted to change
# the message of that commit

Change stuff in an older commit. e.g. wrongly commited target:
git checkout <hash>  #this will detach your head (i.e. you are not on your branch anymore)
  
# do some changes: removing target
git rm -r target
# add some file
git add bla.txt
  
git commit --amend -m "<definitiv commit message>"
# git commit --amend if you want to use the same commit message as before
git rebase --onto HEAD <hash> <branch-name>
# the same hash as the one in the beginning
# branch-name is the one you left when the head got detachted
  
git push -f origin <branch-name>
Go back in the commit history
# uncommit last 2 commits but keep changes
git reset HEAD~2
 
 
# uncommit last 4 commits but keep changes staged
git reset --soft HEAD~4
 
 
# uncommit last commit and discard all the changes
git reset --hard HEAD~
Modifying commit messages

Last commit message
git commit --amend

Older commit messages
# to get a list of the last n commits
git rebase -i HEAD~n
 
 
# then change 'pick' to reword for each of the commit messages you want to change
# save-quit
# each of the commit-messages marked with 'reword' is opened one after the other
# rewrite the message and save-quit - the next commit-message will open.
```