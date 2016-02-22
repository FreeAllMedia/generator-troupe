# Generator-troupe.js [![npm version](https://img.shields.io/npm/v/generator-troupe.svg)](https://www.npmjs.com/package/generator-troupe) [![license type](https://img.shields.io/npm/l/generator-troupe.svg)](https://github.com/FreeAllMedia/generator-troupe.git/blob/master/LICENSE) [![npm downloads](https://img.shields.io/npm/dm/generator-troupe.svg)](https://www.npmjs.com/package/generator-troupe) ![ECMAScript 6 & 5](https://img.shields.io/badge/ECMAScript-6%20/%205-red.svg)

ES6 yeoman generator for FAM troupe.

```
npm install -g generator-troupe
```

# Quality and Compatibility

[![Build Status](https://travis-ci.org/FreeAllMedia/generator-troupe.png?branch=master)](https://travis-ci.org/FreeAllMedia/generator-troupe) [![Coverage Status](https://coveralls.io/repos/FreeAllMedia/generator-troupe/badge.svg)](https://coveralls.io/r/FreeAllMedia/generator-troupe) [![Code Climate](https://codeclimate.com/github/FreeAllMedia/generator-troupe/badges/gpa.svg)](https://codeclimate.com/github/FreeAllMedia/generator-troupe)  [![bitHound Score](https://www.bithound.io/github/FreeAllMedia/generator-troupe/badges/score.svg)](https://www.bithound.io/github/FreeAllMedia/generator-troupe)  [![Dependency Status](https://david-dm.org/FreeAllMedia/generator-troupe.png?theme=shields.io)](https://david-dm.org/FreeAllMedia/generator-troupe?theme=shields.io) [![Dev Dependency Status](https://david-dm.org/FreeAllMedia/generator-troupe/dev-status.svg)](https://david-dm.org/FreeAllMedia/generator-troupe?theme=shields.io#info=devDependencies)

*Every build and release is automatically tested on the following platforms:*

![node 0.12.x](https://img.shields.io/badge/node-0.12.x-brightgreen.svg) ![node 0.11.x](https://img.shields.io/badge/node-0.11.x-brightgreen.svg) ![node 0.10.x](https://img.shields.io/badge/node-0.10.x-brightgreen.svg)
![iojs 2.x.x](https://img.shields.io/badge/iojs-2.x.x-brightgreen.svg) ![iojs 1.x.x](https://img.shields.io/badge/iojs-1.x.x-brightgreen.svg)



*If your platform is not listed above, you can test your local environment for compatibility by copying and pasting the following commands into your terminal:*

```
npm install generator-troupe
cd node_modules/generator-troupe
gulp test-local
```

# How to generate a SCUDL for a provider like AWS through Conan
All of the generators will ask you for the model name, which is singular and camelCased. Eg: apple, account, accountType

## 1. Generate the model
```
yo troupe:model
```
The models are generated with a default name property with a non empty validation. After the generation, is strongly recommended to add all the properties you need to validate, and all the relationships with other models.

## 2. Generate the functions
```
yo troupe:functions
```
This generator will create all the lambda classes to handle the SCUDL operations, all the necessary steps to do that, and it will create also a specialized class that returns all the meta data that a deployer like Conan may need. Every file will have their spec file to test it's functionality.

After this generation you will need to customize all the special steps, adding or removing everything that you may need, as well as the function metadata if necessary, like a timeout or anything.

## 3. Generate the resources
```
yo troupe:resources
```
In this case, the generated class will provide the deployer all the metadata that he may need in order to create the api/http resources that calls the lambda functions. Remember to add here any meta information for the specific resource that you may need.

# How to Contribute

See something that could use improvement? Have a great feature idea? We listen!

You can submit your ideas through our [issues system](https://github.com/FreeAllMedia/generator-troupe/issues), or make the modifications yourself and submit them to us in the form of a [GitHub pull request](https://help.github.com/articles/using-pull-requests/).

We always aim to be friendly and helpful.

## Running Tests

It's easy to run the test suite locally, and *highly recommended* if you're using Troupe Generator on a platform we aren't automatically testing for.

```
npm test
```
