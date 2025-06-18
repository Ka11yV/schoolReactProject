import { Calendar, Trophy, User, TrendingUp, Award } from "lucide-react";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import AwardCard from "./AwardCard";

const API_URL = "http://localhost:3001/todos";

function Profile() {
  const [completedTodos, setCompletedTodos] = useState(0);
  const [completePercent, setCompletePercent] = useState(0.0);
  const [award, setAward] = useState(0);

  const getTodo = async () => {
    try {
      const res = await axios.get(API_URL);
      const todos = res.data;

      const completedCount = todos.filter((todo) => todo.isCompleted).length;
      const percent =
        todos.length > 0
          ? ((completedCount / todos.length) * 100).toFixed(1)
          : "0.0";

      setCompletedTodos(completedCount);
      setCompletePercent(percent);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodo();
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl fond-bold text-gray-800 mb-2">내 프로필</h1>
            <p className="text-gray-600">
              당신의 성취와 진행 상황을 확인해보세요
            </p>
          </div>

          {/* 주요 통계 */}
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card
              title="완료한 할일"
              value={completedTodos}
              iconType={"trophy"}
            />
            <Card
              title="완료율"
              value={`${completePercent}%`}
              iconType={"target"}
            />
            <Card
              title={"이번주"}
              value={completedTodos}
              iconType={"calendar"}
            />
            <Card title={"업적"} value={`2/6`} iconType={"award"} />
          </div>

          {/* 카테고리 별 성과 */}
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg bg-card text-card-foreground shadow-sm">
              <div className="flex items-center gap-2 text-xl text-gray-800">
                <TrendingUp className="h-5 w-5 ml-5 my-5" />
                카테고리별 성과
              </div>
              <div className="space-y-4 h-100"></div>
            </div>

            {/* 업적 */}
            <AwardCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
