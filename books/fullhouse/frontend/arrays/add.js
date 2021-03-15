#!/usr/bin/node
const instruments = ['piano', 'drums', 'trumpet'];
instruments.push("guitar")
instruments.unshift("trumpet")
const lastInstrument = instruments.pop()
instruments.shift()
