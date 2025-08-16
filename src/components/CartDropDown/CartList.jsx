// CartList.jsx
import CartItem from "./CartItem";

export default function CartList({ basket, onIncrease, onDecrease, onRemove }) {
  if (basket.length === 0)
    return (
      <p className="text-gray-600 dark:text-gray-300">سبد خرید خالی است.</p>
    );

  return (
    <ul className="space-y-4 max-h-64 overflow-y-auto divide-y divide-gray-primary/50">
      {basket.map((item, index) => (
        <CartItem
          key={index}
          item={item}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
