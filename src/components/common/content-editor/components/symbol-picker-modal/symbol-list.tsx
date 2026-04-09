import { useRef, useState } from 'react';

import { chunk, noop } from 'lodash-es';

import './symbol-list.styles.scss';

const SYMBOLS_PER_ROW = 9;

type TSymbolItem = {
  key: string;
  value: string;
  title?: string;
  color?: string;
};

interface IProps {
  items: TSymbolItem[];
  onEscapePress?: () => void;
  onSymbolPick?: (value: string) => void;
}

function SymbolList({
  items,
  onEscapePress = noop,
  onSymbolPick = noop,
}: IProps) {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const itemsCount = items.length;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    e.preventDefault();

    if (e.key === 'Enter' || e.key === ' ') {
      onSymbolPick(items[idx].value);
    } else if (e.key === 'ArrowRight') {
      const nextIndex = (idx + 1) % itemsCount;
      setFocusedIndex(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft') {
      const prevIndex = (idx - 1 + itemsCount) % itemsCount;
      setFocusedIndex(prevIndex);
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === 'ArrowDown') {
      const cellBelowIndex = idx + 9;
      if (cellBelowIndex < itemsCount) {
        setFocusedIndex(cellBelowIndex);
        buttonRefs.current[cellBelowIndex]?.focus();
      } else {
        const firstCellOfNextRow =
          Math.ceil(idx / SYMBOLS_PER_ROW) * SYMBOLS_PER_ROW;
        setFocusedIndex(firstCellOfNextRow);
        buttonRefs.current[firstCellOfNextRow]?.focus();
      }
    } else if (e.key === 'ArrowUp') {
      const cellAboveIndex = idx - SYMBOLS_PER_ROW;
      if (cellAboveIndex >= 0) {
        setFocusedIndex(cellAboveIndex);
        buttonRefs.current[cellAboveIndex]?.focus();
      } else {
        const lastCellOfPrevRow =
          Math.floor(idx / SYMBOLS_PER_ROW) * SYMBOLS_PER_ROW - 1;
        setFocusedIndex(lastCellOfPrevRow);
        buttonRefs.current[lastCellOfPrevRow]?.focus();
      }
    } else if (e.key === 'Tab' && e.shiftKey) {
      const prevIndex = (idx - 1 + itemsCount) % itemsCount;
      setFocusedIndex(prevIndex);
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Tab') {
      const nextIndex = (idx + 1) % itemsCount;
      setFocusedIndex(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'Escape') {
      onEscapePress();
    }
  };

  return (
    <table className="symbol-list">
      <tbody>
        {chunk(items, SYMBOLS_PER_ROW).map((row, rowIdx) => (
          <tr key={rowIdx}>
            {row.map(({ key, value, title, color }, idx) => {
              const symbolIdx = rowIdx * SYMBOLS_PER_ROW + idx;
              return (
                <td key={key}>
                  <button
                    type="button"
                    title={title}
                    tabIndex={
                      focusedIndex === symbolIdx || symbolIdx === 0 ? 0 : -1
                    }
                    ref={(el) => (buttonRefs.current[symbolIdx] = el)}
                    onKeyDown={(e) => handleKeyDown(e, symbolIdx)}
                    onClick={() => onSymbolPick(value)}
                    style={{ borderColor: color || '' }}
                  >
                    {value}
                  </button>
                </td>
              );
            })}
            {row.length < SYMBOLS_PER_ROW &&
              Array.from({ length: 9 - row.length }).map((_, i) => (
                <td key={`empty-${i}`} />
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SymbolList;
