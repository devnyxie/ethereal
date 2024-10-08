---
title: 'RVM: Solution to "__rvm_make -j8/j12" error'
publishedAt: 2024-01-09
tags: linux, ruby
summary: Learn how to fix the j8/j12 error while installing Ruby via RVM on Linux systems.
---

<img src="https://i.imgur.com/htR5R62.png" width="800px"/>

# Introduction

Both on Arch and Debian-based distributions I've encountered j8/j12 error while trying to install any version of Ruby via Ruby Version Manager (RVM). Even though solutions were accessible for Mac OS, I couldn't find any solutions for my system. Unexpectedly, it appears that resolving this error is just a matter of a few command lines.

# Fix

In order to fix j8/j12 error, we will have to install Ruby with OpenSSL support.

## OpenSSL Installation

```bash
$ sudo apt-get install libssl-dev
```

## Locate the OpenSSL Installation Directory

- Ubuntu/Debian:

```bash
$ openssl version -d
```

## Ruby Installation with OpenSSL flag

Now, let's utilize the `OPENSSLDIR` obtained from the previous step. For this example, let's install version 2.6.5. We'll use the `--with-openssl-dir=/path/to/openssl` flag to specify the path to the installed OpenSSL package.

```bash
$ rvm install 2.6.5 --with-openssl-dir=/usr/lib/ssl
```

<img src="https://i.imgur.com/y54q2iA.png" width="700px"/>

And that's it! Ruby 2.6.5 is installed ❤
