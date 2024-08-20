# Giới Thiệu về Redux

## Redux là gì?

Redux là một công cụ quản lý trạng thái (application state) tương tự như state trong react nhưng quy mô lớn hơn, không chỉ còn là quản lý trạng thái của 1 component nữa mà là trạng thái/dữ liệu của toàn ứng dụng của bạn (Bạn cứ tưởng tượng nó là 1 biến Global là được).

Redux thường được sử dụng cùng với các thư viện như React, nhưng nó cũng có thể được sử dụng với bất kỳ framework JavaScript nào hoặc thậm chí với JavaScript thuần. 

Với Redux, trạng thái ứng dụng của bạn được giữ trong một `🧳kho chứa` và mỗi thành phần có thể truy cập bất kỳ trạng thái nào mà nó cần từ `🧳kho chứa` này. 

Redux cung cấp pattern (quy luật/luật lệ) để code, thông qua sử dụng "events" (gọi là  actions) => mô hình pub/sub (publisher/subscribers) 

<img src="Chương 1-Tổng quan về Redux/images/pub-sub.png" alt="Mô hình pub/sub" width="300"/>


## Tại sao cần một công cụ quản lý trạng thái?

Giả sử bạn đang phát triển một ứng dụng quản lý danh sách công việc (to-do list). Bạn có hai thành phần (components):

`TodoList` để hiển thị danh sách công việc và `AddTodo` để thêm một công việc mới.

_app.js_
```javascript
// App.js
function App() {
  // Đây là component cha, nơi khai báo các trạng thái mà các component con cần sử dụng chung
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
    {/* Phương thức addTodo được truyền cho thành phần con
        như một props dùng để thay đổi state todos */}
      <AddTodo addTodo={addTodo} />

    {/* State được chuyển cho Component con dưới dạng props và 
      được cập nhật bất cứ khi nào TodoList Component thay đổi dữ liệu*/}
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
```
_AddTodo.js_
```javascript
// AddTodo.js

function AddTodo({ addTodo }) {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    addTodo(input);
  };

  return (
    <div>
      <button onClick={handleSubmit(`New toDo`)}>Add Todo</button>
    </div>
  );
}

export default AddTodo;
```
> Mỗi component phải truyền state và setState qua các props để cập nhật và truy cập danh sách công việc từ component App (cha của cả hai component).

### 🚀 Vấn đề khi không sử dụng Redux:

1. Về cơ bản, trạng thái sẽ phải được nâng lên thành phần cha gần nhất và tiếp theo cho đến khi nó đến một thành phần chung cho cả hai thành phần cần trạng thái, và sau đó nó được truyền lại. Điều này làm cho trạng thái khó duy trì và dữ liệu được truyền đến các thành phần không cần sử dụng nó.

2. Bạn phải truyền các props qua nhiều cấp độ component, điều này dẫn đến prop drilling (truyền props qua nhiều cấp), khiến code khó bảo trì.

<img src="Chương 1-Tổng quan về Redux/images/withoutRedux-WithRedux.png" 
    alt="withoutRedux-WithRedux"
    width="500" 
    style="display:block; margin-left: auto;margin-right: auto;"/>

### Khi nào thì sử dụng Redux?
1. Có 1 lượng lớn dữ liệu của "application state", cần được chia sẻ (sử dụng) tại nhiều nơi trong ứng dụng (dùng tại nhiều component)

2. App state được "update" thường xuyên

3. Logic để cập nhật "app state" dài dòng, phức tạp (nhiều code :3)

4. App có kích thước vừa và lớn (có khối lượng code lớn), và team có nhiều người.

### 🌞 Lý do chọn Redux:
| 🛸Có thể dự đoán | 📚Tập trung | 🐞Có thể debug | 🐱‍🏍Linh hoạt |
| -------- | ------- | ------- |-------|
| Redux giúp bạn viết các ứng dụng có hoạt động nhất quán , chạy trên nhiều môi trường khác nhau (client, server, và native) và dễ kiểm tra.| Việc tập trung trạng thái và logic của ứng dụng cho phép có những khả năng mạnh mẽ như hoàn tác/làm lại , duy trì trạng thái và nhiều hơn nữa. | Redux DevTools giúp bạn dễ dàng theo dõi thời điểm, địa điểm, lý do và cách trạng thái ứng dụng của bạn thay đổi . Kiến trúc của Redux cho phép bạn ghi lại các thay đổi, sử dụng "gỡ lỗi du hành thời gian" và thậm chí gửi báo cáo lỗi đầy đủ đến máy chủ. |Redux hoạt động với mọi lớp UI và có hệ sinh thái tiện ích bổ sung lớn phù hợp với nhu cầu của bạn. |

## Phân loại Redux

### 1. Redux Thuần (Vanilla Redux)
- **Hỗ trợ:** Có thể sử dụng với cả JavaScript và TypeScript.
- **Cách sử dụng:**
  - Dùng với Higher Order Component (HOC) trong các React class component.
  - Các hàm thường được sử dụng bao gồm:
    - `function mapStateToProps(state)`
    - `function mapDispatchToProps(dispatch)`
    - `connect(mapStateToProps, mapDispatchToProps, mergeProps?, options?)`
  - **Lưu ý:** Đây là phong cách truyền thống, phổ biến khi làm việc với các class component trong React. Mặc dù không còn phổ biến bằng các phương pháp hiện đại, nhưng vẫn có giá trị khi làm việc với các dự án cũ hoặc cần tính tương thích cao.

### 2. Redux Toolkit (RTK)
- **Hỗ trợ:** Có thể sử dụng với cả JavaScript và TypeScript.
- **Cách sử dụng:**
  - Dùng với các React hook, phù hợp hơn khi làm việc với functional component.
  - Các hàm nổi bật bao gồm:
    - `useDispatch()`
    - `useSelector()`
  - **Ưu điểm:** Redux Toolkit đơn giản hóa quá trình viết Redux bằng cách cung cấp các công cụ và cấu trúc rõ ràng hơn, giúp giảm thiểu boilerplate code. Đây là lựa chọn phù hợp khi bắt đầu với Redux trong các dự án mới hoặc chuyển đổi từ class component sang functional component.

### 3. React Tool Kit Query - RTK Query
- **Mục đích:** Tập trung vào việc fetching (lấy dữ liệu) và caching (lưu trữ dữ liệu tạm thời).
- **Tính năng:** RTK Query là một giải pháp toàn diện cho việc quản lý dữ liệu trong Redux, tương tự như các thư viện như React Query hoặc SWR, nhưng được tích hợp trực tiếp trong Redux Toolkit.
- **Lợi ích:** Giúp đơn giản hóa việc tương tác với API, giảm thiểu mã lệnh cần thiết cho việc quản lý trạng thái dữ liệu từ các nguồn bên ngoài, đồng thời tối ưu hóa hiệu suất ứng dụng thông qua việc caching.


## Các Khái Niệm Chính

### 1. **State**
State đại diện cho toàn bộ trạng thái của ứng dụng trong một đối tượng JavaScript duy nhất. Đây là nơi lưu trữ tất cả dữ liệu cần thiết để hiển thị giao diện và xử lý logic ứng dụng.

### 2. **Action**
Action là một đối tượng JavaScript đơn giản mô tả một thay đổi cần thiết xảy ra trong state của ứng dụng. Mỗi action phải có một thuộc tính `type` mô tả loại hành động đang xảy ra và có thể chứa các thuộc tính khác để truyền dữ liệu bổ sung.

```javascript
{
  type: 'ADD_TODO',
  payload: { text: 'Learn Redux' }
}
```

### 3. **Reducer**
Reducer là một hàm thuần túy nhận vào state hiện tại và một action, sau đó trả về state mới. Reducer không thay đổi state hiện tại mà tạo ra một bản sao mới với các thay đổi cần thiết. Các state này được lưu trữ dưới dạng đối tượng và chúng xác định trạng thái của ứng dụng thay đổi như thế nào để đáp ứng với hành động được gửi đến "store".

```javascript
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          text: action.payload.text,
          completed: false
        }
      ];
    default:
      return state;
  }
}
```

### 4. **Store**
Store là nơi lưu trữ state của ứng dụng và là nơi duy nhất mà state có thể được cập nhật thông qua gửi đi các actions. Chỉ có một "store" trong bất kỳ ứng dụng Redux nào. Store cung cấp các phương thức để truy cập state, dispatch actions, và đăng ký các listeners để lắng nghe thay đổi state.

```javascript
import { createStore } from 'redux';
import todos from './reducers/todos';

const store = createStore(todos);
```

## Kết luận

Redux là một công cụ mạnh mẽ giúp bạn quản lý state của ứng dụng một cách rõ ràng và có cấu trúc. 

Mặc dù có thể có một chút phức tạp khi mới bắt đầu, nhưng khi bạn hiểu cách hoạt động của Redux, bạn sẽ thấy nó là một công cụ rất hữu ích cho việc phát triển các ứng dụng JavaScript lớn và phức tạp.

🐱‍🏍Đi tới bài tiếp theo -> [Chương 2-Cài đặt Redux][link-chuong-2]

[link-chuong-2]: https://github.com/TranDatk/Learn-Redux-tool-kit-redux-saga-and-react-query-in-Vietnamese/tree/master/






