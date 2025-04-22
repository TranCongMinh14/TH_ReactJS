import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from '../features/counter/counterSlice'

function Counter() {
  const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">Counter App</h1>
      <p className="text-xl mb-4">Count: {count}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
        onClick={() => dispatch(increment())}
      >
        Tăng
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => dispatch(decrement())}
      >
        Giảm
      </button>
    </div>
  )
}

export default Counter
