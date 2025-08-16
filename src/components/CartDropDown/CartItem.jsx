// CartItem.jsx
import { FiTrash2 } from "react-icons/fi";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <li className="flex items-center justify-between pb-3 w-full gap-3">
      <img
        src={item.image}
        alt={item.name}
        className="w-14 h-14 object-cover rounded-md flex-shrink-0"
        loading="lazy"
      />
      <div className="flex flex-col flex-grow min-w-0">
        <h5 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
          {item.name}
        </h5>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {item.price.toLocaleString("fa-IR")} تومان
        </p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onDecrease(item.id)}
          className="px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
        >
          -
        </button>
        <span className="px-2 text-gray-900 dark:text-gray-100">
          {item.count}
        </span>
        <button
          onClick={() => onIncrease(item.id)}
          className="px-2 py-1 rounded bg-green-500 hover:bg-green-600 text-white"
        >
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </li>
  );
}
