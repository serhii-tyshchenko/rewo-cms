import { describe, expect, it } from 'vitest';

import { createTFunctionMock } from '@utils/test/mocks';

import { getModalLabels, getValue } from './utils';

describe('(Function) getModalLabels', () => {
  const t = createTFunctionMock();

  it('should return edit labels for edit action', () => {
    expect(getModalLabels('edit', t)).toEqual({
      modalTitle: 'editCategory',
      confirmBtnTitle: 'save',
    });
  });

  it('should return add labels for add action', () => {
    expect(getModalLabels('add', t)).toEqual({
      modalTitle: 'addCategory',
      confirmBtnTitle: 'add',
    });
  });

  it('should return clone labels for clone action', () => {
    expect(getModalLabels('clone', t)).toEqual({
      modalTitle: 'cloneCategory',
      confirmBtnTitle: 'confirm',
    });
  });

  it('should fallback to edit labels for delete action', () => {
    expect(getModalLabels('delete', t)).toEqual({
      modalTitle: 'editCategory',
      confirmBtnTitle: 'save',
    });
  });
});

describe('(Function) getValue', () => {
  it('should convert parent value to number', () => {
    expect(getValue('parent', '42')).toBe(42);
  });

  it('should return original value for non-parent name', () => {
    expect(getValue('name', 'Category')).toBe('Category');
  });
});
