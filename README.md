# Back-end for PDS data handbook

This repository includes the complete back-end for the PDS data handbook application. It includes every endpoint and associated controller, as well as every database model. This README will act as a guide for how to install the back-end and how to run both the server and the tests.

## Installation

### Clone repository

Note: Make sure to have [git](https://git-scm.com/). This can be verified by typing ```git --version``` in your terminal.

Clone the repository by your method of choice. To clone with HTTPS, open your terminal and navigate to the directory in which you want to clone the project. Type:
```
git clone https://github.com/SINTEF/pds_hb_be.git
```

### Install dependencies

Note: Make sure to have [node](https://nodejs.org/en/download/). This can be verified by typing ```npm --version```in your terminal.

In your terminal, navigate to the root directory of the repository you just cloned and type:
```
npm install
```

## Usage

To run the entire application, see [front-end README](https://github.com/SINTEF/pds_hb/blob/development/README.md)

### Running the server

To run the back-end of the PDS data handbook, navigate to the root folder and type:
```
npm start
```

_NB: The server will not run if you do not have the environment variables. For the staff of TDT4290, the envionment variables can be found in the repport appendix in the section called "README for Front-end and Back-end". In your local repository simply paste the variables found in the appendix. They should be on the format:_

_SECRET_KEY=..._

_mongoURI=..._

### Running the tests

To run the test of the back-end, navigate to the root folder and type:
```
npm test
```
