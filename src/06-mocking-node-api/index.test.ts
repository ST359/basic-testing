// Uncomment the code below and write your tests
import path, { join } from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 1000);
    expect(setTimeout).toBeCalledWith(cb, 1000);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, 1000);
    expect(cb).toBeCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(cb).toBeCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 1000);
    expect(setInterval).toBeCalledWith(cb, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, 1000);
    jest.advanceTimersByTime(3000);
    expect(cb).toBeCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    await readFileAsynchronously('file.txt');
    expect(join).toBeCalledWith(__dirname, 'file.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    expect(readFileAsynchronously('file.txt')).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    const fileContent: string = 'test file content';
    jest.spyOn(path, 'join');
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);
    await expect(readFileAsynchronously('test.txt')).resolves.toBe(fileContent);
  });
});
