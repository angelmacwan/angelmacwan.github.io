**What is Git?**
Git is a distributed version control system (DVCS) designed to handle everything from small to very large projects with speed and efficiency. It allows multiple people to collaborate on projects and keep track of changes made to files over time.

**Key Concepts in Git:**

1. **Repository (Repo):** This is the core of Git. It's a directory where Git stores all the files and the history of changes for a project.

2. **Commit:** A commit is a snapshot of the project at a specific point in time. It represents a set of changes made to the files in the repository.

3. **Branch:** A branch is essentially a parallel version of the repository. It allows you to work on new features or fixes without affecting the main project until you're ready to merge your changes.

4. **Merge:** Merging combines changes from different branches into one branch. It's typically used to incorporate the changes made in a feature branch back into the main branch.

5. **Pull Request (PR):** A pull request is a request to merge changes from one branch into another. It's commonly used in collaborative environments, where team members review each other's code before merging it into the main branch.

**Basic Git Workflow:**

1. **Initialize a Repository:**

    ```bash
    git init
    ```

2. **Add Files to the Staging Area:**

    ```bash
    git add <file1> <file2> ...
    ```

3. **Commit Changes:**

    ```bash
    git commit -m "Commit message"
    ```

4. **Create a Branch:**

    ```bash
    git checkout -b new-feature
    ```

5. **Make Changes and Commit:**

    ```bash
    # Make changes to files
    git add .
    git commit -m "Implement new feature"
    ```

6. **Switch Branches:**

    ```bash
    git checkout main
    ```

7. **Merge Branches:**

    ```bash
    git merge new-feature
    ```

8. **Push Changes to Remote Repository:**
    ```bash
    git push origin main
    ```

**Example:**

Let's say you're working on a project with a friend. You both clone the repository to your local machines:

```bash
git clone <repository_url>
cd <repository_name>
```

You create a new branch to work on a feature:

```bash
git checkout -b new-feature
```

You make changes to some files, add them to the staging area, and commit your changes:

```bash
# Make changes
git add .
git commit -m "Implemented new feature"
```

Meanwhile, your friend makes some changes on the main branch. You want to incorporate those changes into your branch, so you switch back to the main branch, pull the latest changes, and then switch back to your feature branch:

```bash
git checkout main
git pull origin main
git checkout new-feature
```

Finally, when you're done with your feature and have tested it thoroughly, you merge it back into the main branch:

```bash
git checkout main
git merge new-feature
```

And push the changes to the remote repository:

```bash
git push origin main
```
