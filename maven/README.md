This is an overview and introduction into the maven core concepts - It is NOT a complete tutorial on how to use maven or create plugins for it and things like that. But it should provide you with the basics to get you going and such that you then should be able to easily follow any kind of more in refined guides.
A lot of this comes from https://maven.apache.org/guides/introduction


This introduction consists of _nested_ expandable sections. Maven is pretty big and it can be overwhelming at first. Here the idea is that by first reading without expanding you'll get an _overview_. Then start expanding the sections to get more and more details.

# Maven

Maven is a build tool and is mainly concerned with how software should be _built_ and how _dependencies_ should be managed.



## The Build Lifecycle
<details>
<summary>
Maven is based around the central concept of a build lifecycle - these describe steps how the project gets built
</summary>

There are three built-in build lifecycles: ``default``, ``clean`` and ``site``. The ``default`` lifecycle handles your project deployment, the ``clean`` lifecycle handles project cleaning, while the ``site`` lifecycle handles the creation of your project's site documentation.

Each of these build lifecycles is defined by a different list of _build phases_, wherein a build phase represents a stage in the lifecycle.

### A Build Lifecycle is Made Up of _Phases_

For example, the ``default`` lifecycle comprises the following phases (for a complete list of the lifecycle phases, refer to the [Lifecycle Reference](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html#Lifecycle_Reference):

- ``validate`` - validate the project is correct and all necessary information is available
- ``compile`` - compile the source code of the project
- ``test`` - test the compiled source code using a suitable unit testing framework. These tests should not require the code be packaged or deployed
- ``package`` - take the compiled code and package it in its distributable format, such as a JAR.
- ``verify`` - run any checks on results of integration tests to ensure quality criteria are met
- ``install`` - install the package into the local repository, for use as a dependency in other projects locally
- ``deploy`` - done in the build environment, copies the final package to the remote repository for sharing with other developers and projects.

When we use maven, usually we tell it to run one of these phases. Maven will then run all the phases defined in the lifecycle up until the one specified.

``mvn install`` will run ``validate``, ``test``, etc. and in the end ``install``,

### A Build Phase is Made Up of Plugin Goals

Even though a build phase is responsible for a specific step in the build lifecycle, the manner in which it carries out those responsibilities may vary. And this is done by declaring the _plugin goals_ bound to those build phases.

To see all the phases of the lifecycle and see which plugins are bound to the phases run something like for instance:

```
mvn help:describe -Dcmd=deploy
```

To see more information about a plugin (in the example 'dependency') and its available goals run:
```
mvn dependency:help
```

<details>
<summary>
A plugin goal represents a specific task (finer than a build phase).
</summary>
If a build phase has no goals bound to it, that build phase will not execute. But if it has one or more goals bound to it, it will execute all those goals.

A goal may be bound to zero or more build phases. A goal not bound to any build phase could be executed outside of the build lifecycle by direct invocation. If a goal is bound to one or more build phases, that goal will be called in all those phases.
</details>

To list all the available goals of a plu

To execute the copy-dependencies goal from the dependency phase run:
```
mvn dependency:copy-dependencies
```

Source: https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html
</details>








## The POM (pom.xml)
<details>
<summary>
The Project Object Model (POM) is the core of a project's configuration in Maven and is represented by the pom.xml
</summary>

It is a single configuration file that contains the majority of information required to build a project in just the way you want. Some of the configuration that can be specified in the POM are the project dependencies, build directory, source directory, test directory, the plugins or goals that can be executed, the build profiles, and so on. Other information such as the project version, description, developers, mailing lists and such can also be specified. It contains default values for most projects. Examples for this is the build directory, which is target; the source directory, which is src/main/java; the test source directory, which is src/test/java; and so on.

The minimum requirement for a POM are the following:

- project root
- modelVersion - should be set to 4.0.0 (for maven 2 and 3)
- groupId - the id of the project's group.
- artifactId - the id of the artifact (project)
- version - the version of the artifact under the specified group

<details>
<summary>
Expand to see an example of a minimal pom.xml
</summary>

```
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1</version>
</project>
```

As you can see that in the minimal POM, for instance the repositories were not specified. If you build your project using the minimal POM, it would inherit the repositories configuration in the Super POM. Therefore when Maven sees the dependencies in the minimal POM, it would know that these dependencies will be downloaded from http://repo.maven.apache.org/maven2 which was specified in the Super POM.
</details>


A POM requires that its ``groupId``, ``artifactId``, and ``version`` be configured. These three values form the project's fully qualified artifact name. This is in the form of ``<groupId>:<artifactId>:<version>``. As for the example above, its fully qualified artifact name is ``com.mycompany.app:my-app:1``.

<details>
<summary>
The Super POM is Maven's default POM. All POMs extend the Super POM unless explicitly set, meaning the configuration specified in the Super POM is inherited by the POMs you created for your projects.
</summary>

Example super POM

```
<project>
  <modelVersion>4.0.0</modelVersion>

  <repositories>
    <repository>
      <id>central</id>
      <name>Central Repository</name>
      <url>http://repo.maven.apache.org/maven2</url>
      <layout>default</layout>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
    </repository>
  </repositories>

  <pluginRepositories>
    <pluginRepository>
      <id>central</id>
      <name>Central Repository</name>
      <url>http://repo.maven.apache.org/maven2</url>
      <layout>default</layout>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
      <releases>
        <updatePolicy>never</updatePolicy>
      </releases>
    </pluginRepository>
  </pluginRepositories>

  <build>
    <directory>${project.basedir}/target</directory>
    <outputDirectory>${project.build.directory}/classes</outputDirectory>
    <finalName>${project.artifactId}-${project.version}</finalName>
    <testOutputDirectory>${project.build.directory}/test-classes</testOutputDirectory>
    <sourceDirectory>${project.basedir}/src/main/java</sourceDirectory>
    <scriptSourceDirectory>src/main/scripts</scriptSourceDirectory>
    <testSourceDirectory>${project.basedir}/src/test/java</testSourceDirectory>
    <resources>
      <resource>
        <directory>${project.basedir}/src/main/resources</directory>
      </resource>
    </resources>
    <testResources>
      <testResource>
        <directory>${project.basedir}/src/test/resources</directory>
      </testResource>
    </testResources>
    <pluginManagement>
      <!-- NOTE: These plugins will be removed from future versions of the super POM -->
      <!-- They are kept for the moment as they are very unlikely to conflict with lifecycle mappings (MNG-4453) -->
      <plugins>
        <plugin>
          <artifactId>maven-antrun-plugin</artifactId>
          <version>1.3</version>
        </plugin>
        <plugin>
          <artifactId>maven-assembly-plugin</artifactId>
          <version>2.2-beta-5</version>
        </plugin>
        <plugin>
          <artifactId>maven-dependency-plugin</artifactId>
          <version>2.1</version>
        </plugin>
        <plugin>
          <artifactId>maven-release-plugin</artifactId>
          <version>2.0</version>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>

  <reporting>
    <outputDirectory>${project.build.directory}/site</outputDirectory>
  </reporting>

  <profiles>
    <!-- NOTE: The release profile will be removed from future versions of the super POM -->
    <profile>
      <id>release-profile</id>

      <activation>
        <property>
          <name>performRelease</name>
          <value>true</value>
        </property>
      </activation>

      <build>
        <plugins>
          <plugin>
            <inherited>true</inherited>
            <artifactId>maven-source-plugin</artifactId>
            <executions>
              <execution>
                <id>attach-sources</id>
                <goals>
                  <goal>jar</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
          <plugin>
            <inherited>true</inherited>
            <artifactId>maven-javadoc-plugin</artifactId>
            <executions>
              <execution>
                <id>attach-javadocs</id>
                <goals>
                  <goal>jar</goal>
                </goals>
              </execution>
            </executions>
          </plugin>
          <plugin>
            <inherited>true</inherited>
            <artifactId>maven-deploy-plugin</artifactId>
            <configuration>
              <updateReleaseInfo>true</updateReleaseInfo>
            </configuration>
          </plugin>
        </plugins>
      </build>
    </profile>
  </profiles>

</project>
```

</details>  

<details>
<summary>
Apart from the project declaration (GAV) some other important top-level sections of the pom.xml exist, like: dependencies, repositories, pluginRepositories and build 
</summary>

**Dependencies**: As mentioned in the beginning one central point of maven is to manage depencies. To include dependencies we list the GAV-coordinates of the required artifacts in the dependencies section

<details>
<summary>
Example dependencies section
</summary>

```
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>3.8.1</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```
</details>

**Repositoreis** and **pluginRepositories**: define the repos which maven search when looking for artifacs

<details>
<summary>
Example repositories section
</summary>

```
<repositories>
    <repository>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
      <id>central</id>
      <name>Central Repository</name>
      <url>https://repo.maven.apache.org/maven2</url>
    </repository>
  </repositories>
```

</details>

<details>
<summary>
Example pluginRepositories section
</summary>

```
<pluginRepositories>
    <pluginRepository>
      <releases>
        <updatePolicy>never</updatePolicy>
      </releases>
      <snapshots>
        <enabled>false</enabled>
      </snapshots>
      <id>central</id>
      <name>Central Repository</name>
      <url>https://repo.maven.apache.org/maven2</url>
    </pluginRepository>
  </pluginRepositories>
```

</details>


**build**: is usually the largest section and it describes your build. Here also all plugins are listed used during your build in the ``<pluginManagement>`` section.
<details>
<summary>
Example build section
</summary>

```
<build>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-jar-plugin</artifactId>
          <version>3.1.2</version>
          <configuration>
            <archive>
              <manifestFile>/src/main/resources/META-INF/MANIFEST.MF</manifestFile>
              <index>true</index>
              <manifest>
                <addClasspath>true</addClasspath>
              </manifest>
            </archive>
          </configuration>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
```

</details>

<details>
<summary>
Here an example of a bit a larger pom.xml without repositories or pluginRepositories (we inherit those from the super pom. Have a look at the effective with 'mvn help:effective-pom' to see the repos you are using).
</summary>
```
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.myOrganisation.commons</groupId>
  <artifactId>java-project</artifactId>
  <packaging>jar</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>java-project</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
  <build>
    <pluginManagement>
      <plugins>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-jar-plugin</artifactId>
          <version>3.1.2</version>
          <configuration>
            <archive>
              <manifestFile>/src/main/resources/META-INF/MANIFEST.MF</manifestFile>
              <index>true</index>
              <manifest>
                <addClasspath>true</addClasspath>
              </manifest>
            </archive>
          </configuration>
        </plugin>
      </plugins>
    </pluginManagement>
  </build>
</project>
```
</details>


</details>

<details>
<summary>
If the configuration details are not specified, Maven will use their defaults. 
</summary>
One of these default values is the packaging type. Every Maven project has a packaging type. If it is not specified in the POM, then the default value "jar" would be used.
</details>

<details>
<summary>
Apar from the Super-POM, maybe your project also inherits the pom from some parent project.
</summary> 

This means, that in the end, within the project you are working on, a lot of things might be set without you being aware of it and can't be found within the ``pom.xml`` of your project. But maybe at some point you want to be able to see, what does the 'final' pom which get's applied to your project look like - with all the inherited stuff and everything else in it: this 'final' pom is what is called the effective pom.

You can see what the effective pom looks like by running:
```
mvn help:effective-pom
```
</details>



For more info please visit: https://maven.apache.org/guides/introduction/introduction-to-the-pom.html (Project inheritance, aggregation, inheritance vs aggregation, etc.)
</details>
























## The GAV-coordinates
<details>
<summary>
In the pom.xml section we presented a minimal pom.xml. Part of a minimal pom is that we set a (G)roupId, an (A)rtifactId and a (V)ersion. These three attributes are used to uniquely identify any maven-artifact and are known as the GAV-coordinates.
</summary>


 These are also the coordinates you need to provide when you want to include a maven artifact as a dependency in your project. And these coordinates define the layout (i.e. the directory sturcture) of where an artifact can be found in a repository. A repository is a 'place' where all the artifacts are stored. If you are running maven locally you'll have a local repository (by default it is the .m2 folder in your home folder), but it can also be a remote repository. The nice and interesting thing is that the structure of the repository will be the same for an artifact.

The basic rules to map between a path and the gav-coordinates are:

- Dots get replaced by slashes (i.e. subfolders)
- Then for each artifact within the groupId we'll have a folder
- Within an artifact folder we'll have a folder for each version
- Within each of the artifact folders we'll find the actual artifact
- The default name for an artifact is ``<artifactId>-<version>.<packaging>``

So, if the GAVs of an artifact are

```
<groupId>Z.Y.X</groupId>
<artifactId>fancy-app</artifactId>
<version>1.0</version>
```

Then this artifact will be found at the following location in a maven repository (let's assume the app is a jar)

```
someRepo.com
     |
      `-- Z
          `-- Y
              `-- X
                 `-- fancy-app
                      `-- 1.0
                           `-- fancy-app-1.0.jar
```

To make this point abundantly clear let's also state what the path for this artifact will be:

``Z/Y/X/fancy-app/1.0/fancy-app-1.0.jar``

If no manual intervention is done (like setting a ``<finalname>`` or the like) then this will be a 1-to-1 mapping where one can reconstruct the ``groupId``, ``artifactId`` and version from a given path and vice-versa.

Additionally a ``<classifier>`` can be defined which would let us create different versions of the same artifact.
</details>
















## The Standard Directory Layout
<details>

<summary>
To use maven a certain convention of directory layout of your project is expected.
</summary

If you intialize your maven project with:

```
mvn archetype:generate 
    -DgroupId=org.organisation.commons 
    -DartifactId=java-project 
    -DinteractiveMode=false
```
you'll get the following directory structure

```
├── pom.xml
└── src
    ├── main
    │   └── java
    │       └── org
    │           └── organisation
    │               └── commons
    │                   └── App.java
    └── test
        └── java
            └── org
                └── organisation
                    └── commons
                        └── AppTest.java
```
At the toplevel currently there only is a ``pom.xml`` and a single directory ``src``. In the ``src`` you'll find ``main`` which constitutes all your application code and ``test`` which should be selfexplanatory.

As already mentioned in the GAV section already, note how the structre reflects the GAV-coordinates.

After building your project with

```
mvn clean install
```
one gets a second toplevel directory - ``target`` which contains all the output produced by the build. There you'll also find the application itself ``target/java-project-1.0-SNAPSHOT.jar``


```
├── pom.xml
├── src
│   ├── main
│   │   └── java
│   │       └── org
│   │           └── myOrganisation
│   │               └── commons
│   │                   └── App.java
│   └── test
│       └── java
│           └── org
│               └── myOrganisation
│                   └── commons
│                       └── AppTest.java
└── target
    ├── classes
    │   └── org
    │       └── myOrganisation
    │           └── commons
    │               └── App.class
    ├── java-project-1.0-SNAPSHOT.jar
    ├── maven-archiver
    │   └── pom.properties
    ├── maven-status
    │   └── maven-compiler-plugin
    │       ├── compile
    │       │   └── default-compile
    │       │       ├── createdFiles.lst
    │       │       └── inputFiles.lst
    │       └── testCompile
    │           └── default-testCompile
    │               ├── createdFiles.lst
    │               └── inputFiles.lst
    ├── surefire-reports
    │   ├── org.myOrganisation.commons.AppTest.txt
    │   └── TEST-org.myOrganisation.commons.AppTest.xml
    └── test-classes
        └── org
            └── myOrganisation
                └── commons
                    └── AppTest.class
```

At the top level, files describe the project: here is a ``pom.xml`` file and some textual documents: ``README.txt``

After building the project There are just two subdirectories of this structure: src and target. The only other directories that would be expected here are metadata like .git (.svn, etc.)

The target directory is used to house all output of the build.

The src directory contains all of the source material for building the project, its site and so on. It contains a subdirectory for each type: main for the main build artifact, test for the unit test code and resources, site and so on (e.g.: it (integration testing),
</details>



