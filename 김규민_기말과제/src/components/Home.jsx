import React, { useEffect, useState } from "react";
import { BookmarkCheck, Clock, Plus } from "lucide-react";
import Card from "./Card";
import TodoListCard from "./TodoListCard";
import Dropdown from "./dropdown";
import axios from "axios";

const API_URL = "http://localhost:3001/todos";

function Home() {
  const [remainingTodos, setRemainingTodos] = useState(0);
  const [completeTodos, setCompleteTodos] = useState(0);
  const [allRemaningTodos, setAllRemaningTodos] = useState(0);
  const [allTodos, setAllTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [newTodoType, setNewTodoType] = useState("일반");

  const getTodo = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res.data);
      setAllTodos(res.data);
      setRemainingTodos(res.data.filter((todo) => !todo.isCompleted).length);
      setCompleteTodos(res.data.filter((todo) => todo.isCompleted).length);
      setAllRemaningTodos(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const addTodo = async (text, type) => {
    try {
      const newTodo = {
        text,
        type,
        isCompleted: false,
      };
      const res = await axios.post(API_URL, newTodo);
      setAllTodos((prev) => [...prev, res.data]); // 즉시 반영
      setNewTodoText(""); // 입력값 초기화
    } catch (err) {
      console.error("POST 요청 실패", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      // 클라이언트 상태에서 해당 todo 제거
      setAllTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error("DELETE 요청 실패:", err);
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const res = await axios.patch(`${API_URL}/${id}`, updatedFields);
      const updatedTodo = res.data;

      setAllTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, ...updatedTodo } : todo
        )
      );

      localStorage.setItem("firstStep", true);
    } catch (err) {
      console.error("UPDATE 실패", err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-200">
      <div className="container mx-auto px-4 py-8 ">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              오늘의 할일
            </h1>
            <p>목표를 달성하고 성장해보세요</p>
          </div>

          {/* 현재 상황 카드들  */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card
              title={"남은 할일"}
              value={remainingTodos}
              iconType={"clock"}
            />
            <Card
              title={"오늘 완료"}
              value={completeTodos}
              iconType={"check"}
            />
            <Card
              title={"전체 할일"}
              value={allRemaningTodos}
              iconType={"plus"}
            />
          </div>
        </div>

        {/* 새로운 할 일 추가 인풋 창 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow mt-20">
          <div className="text-xl text-gray-800 mb-4">새로운 할일 추가</div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="할일을 입력하세요"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              value={newTodoText}
              onChange={(e) => {
                setNewTodoText(e.target.value);
              }}
            />
            {/* 드롭다운 */}
            <select
              value={newTodoType}
              onChange={(e) => setNewTodoType(e.target.value)}
              className="px-3 py-2 border rounded-md bg-white"
            >
              <option value="일반">일반</option>
              <option value="공부">공부</option>
              <option value="운동">운동</option>
              <option value="업무">업무</option>
            </select>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={(e) => {
                e.preventDefault();
                addTodo(newTodoText, newTodoType);
              }}
            >
              <Plus color="white" />
            </button>
          </div>
        </div>

        {/* 할일 목록 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow mt-20">
          <div className="text-xl text-gray-800 mb-4">TODO</div>
          {allTodos.map((todo) => {
            return (
              <TodoListCard
                key={todo.id}
                isCompleted={todo.isCompleted}
                id={todo.id}
                title={todo.text}
                type={todo.type}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
