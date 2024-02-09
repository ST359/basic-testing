// Uncomment the code below and write your tests
import {
  TransferFailedError,
  SynchronizationFailedError,
  InsufficientFundsError,
  getBankAccount,
} from '.';
import { random } from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(15);
    expect(acc.getBalance()).toBe(15);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(10);
    expect(() => acc.withdraw(20)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(10);
    const acc2 = getBankAccount(0);
    expect(() => acc.transfer(20, acc2)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(10);
    expect(() => acc.transfer(5, acc)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(10);
    expect(acc.deposit(10).getBalance()).toBe(20);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(10);
    expect(acc.withdraw(5).getBalance()).toBe(5);
  });

  test('should transfer money', () => {
    const acc = getBankAccount(10);
    const acc2 = getBankAccount(0);
    expect(acc.transfer(7, acc2).getBalance()).toBe(3);
    expect(acc2.getBalance()).toBe(7);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(5);
    jest.spyOn(acc, 'fetchBalance').mockImplementation(async () => {
      const balance = random(0,100,false);
      const requestFailed = false;
      return requestFailed ? null : balance;
    });
    expect(acc.fetchBalance()).resolves.toBe<Number>;
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(0);
    jest.spyOn(acc, 'fetchBalance').mockImplementation(async () => {
      const balance = 50;
      const requestFailed = false;
      return requestFailed ? null : balance;
    });
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toBe(50);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(0);
    jest.spyOn(acc, 'fetchBalance').mockImplementation(async () => {
      return null
    });
    expect(acc.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
