import { Form, Input, InputNumber } from "antd";

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: T;
  index: number;
}

export function EditableCell<T>({ editing, dataIndex, title, inputType, children, ...restProps }: EditableCellProps<T>) {
  const inputNode = inputType === "number" ? <InputNumber style={{ width: "100%" }} /> : <Input style={{ width: "100%" }} />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          noStyle
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Silahkan masukkan ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
