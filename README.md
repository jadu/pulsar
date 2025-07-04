# Pulsar

[![Build Status](https://travis-ci.org/jadu/pulsar.svg?branch=develop)](https://travis-ci.org/jadu/pulsar) [![codecov](https://codecov.io/gh/jadu/pulsar/branch/develop/graph/badge.svg)](https://codecov.io/gh/jadu/pulsar) [![license](https://img.shields.io/github/license/jadu/pulsar.svg)]()

Pulsar is the User Experience and Interface framework for [Jadu](http://jadu.net) software.

## Introduction

Watch a Jadu Academy session presented by Paul Stanton, Pulsar Product Owner which gives an overview of Pulsar and how it influences our product development.

[![Jadu Pulsar - The UI framework for the Continuum platform](https://raw.githubusercontent.com/jadu/pulsar/develop/images/youtube.jpg)](https://www.youtube.com/watch?v=rmGUTvuBvdw)

## Documentation

Documentation is available online at [https://jadu.github.io/pulsar](https://jadu.github.io/pulsar), we welcome any feedback on areas which may need improvement.

## Installation

### Using Docker Compose

#### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (version 4.0.0+) - includes Docker Engine and Docker Compose
- Git (version 2.0.0+)

#### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/jadu/pulsar.git
   cd pulsar
   ```

2. Start the Docker containers:
   ```bash
   docker compose up -d
   ```

3. Access Pulsar:
   Once the containers are running, Pulsar should be available at `http://localhost:9000`

4. Stop the containers when finished:
   ```bash
   docker compose down
   ```

## Contributing

New issues can be submitted through the [GitHub Issue Tracker](https://github.com/jadu/pulsar/issues), and [Pull Requests](https://github.com/jadu/pulsar/pulls) are very welcome, please take a minute to read our [notes for contributors](https://github.com/jadu/pulsar/blob/develop/CONTRIBUTING.md).

## Mission Statement

* Improve code quality and consistency
* Enable developers to prototype in hours, not days
* Allow the continual release of UI improvements
* Provide a common UI language to help new developers learn our lingo
* Provide a starting point to redesign older parts of the software
* Improve performance
* Make our interfaces more testable
* Make the users of our software happier
* Make the people designing Jadu interfaces happier
* Learn how our customers use our software
* Learn what our customers need (not necessarily what they ask for) so that we can build the right thing
* Reduce the complexity of the tasks our customers need to perform
* Define clear, understandable guidelines for developers to build awesome things

## License

MIT © [Jadu](http://jadu.net)