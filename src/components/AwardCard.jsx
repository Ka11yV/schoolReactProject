import React, { useEffect, useState } from "react";
import { Award } from "lucide-react";
import axios from "axios";

const API_URL = "http://localhost:3001/todos";

function AwardCard() {
  const [firstStep, setFirstStep] = useState(false);
  const [studyCount, setStudyCount] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);

  const getProgressWidth = (done, total) =>
    `${Math.min((done / total) * 100, 100)}%`;

  useEffect(() => {
    const isFirstStep = localStorage.getItem("firstStep") === "true";
    setFirstStep(isFirstStep);

    const getTodo = async () => {
      try {
        const res = await axios.get(API_URL);
        const data = res.data;

        setStudyCount(
          data.filter((todo) => todo.type === "공부" && todo.isCompleted).length
        );
        setExerciseCount(
          data.filter((todo) => todo.type === "운동" && todo.isCompleted).length
        );
        setCompleteCount(data.filter((todo) => todo.isCompleted).length);
      } catch (err) {
        console.error(err);
      }
    };

    getTodo();
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-300 p-6 shadow-sm">
      {/* 상단 헤더 */}
      <div className="flex items-center gap-2 text-xl text-gray-800 mb-4">
        <Award className="h-5 w-5" />
        <span>업적</span>
      </div>

      {/* 업적 리스트 */}
      <div className="space-y-4">
        {/* 첫 걸음 */}
        <AchievementItem
          icon="🎯"
          title="첫 걸음"
          description="첫 번째 할일을 완료하세요"
          done={firstStep ? 1 : 0}
          total={1}
        />

        {/* 공부 중독자 */}
        <AchievementItem
          icon="📕"
          title="공부 중독자"
          description="공부 일정 5개를 완료하세요"
          done={studyCount}
          total={5}
        />

        {/* 보디빌더 */}
        <AchievementItem
          icon="💪"
          title="보디빌더"
          description="운동 일정 5개를 완료하세요"
          done={exerciseCount}
          total={5}
        />

        {/* 완벽한 준비 */}
        <AchievementItem
          icon="🏆"
          title="완벽한 준비"
          description="20개의 할일을 완료하세요"
          done={completeCount}
          total={20}
        />
      </div>
    </div>
  );
}

function AchievementItem({ icon, title, description, done, total }) {
  const unlocked = done >= total;
  const progress = `${Math.min((done / total) * 100, 100)}%`;

  return (
    <div
      className={`p-3 rounded-lg border ${
        unlocked
          ? "bg-yellow-50 border-yellow-200"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`text-2xl ${unlocked ? "" : "grayscale opacity-50"}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`font-medium ${
                unlocked ? "text-gray-800" : "text-gray-500"
              }`}
            >
              {title}
            </h3>
            {unlocked && (
              <div className="text-[10px] px-2 py-[2px] rounded bg-yellow-500 text-white font-medium">
                달성!
              </div>
            )}
          </div>
          <p
            className={`text-sm mb-2 ${
              unlocked ? "text-gray-600" : "text-gray-400"
            }`}
          >
            {description}
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: progress }}
              />
            </div>
            <span className="text-xs text-gray-500">
              {done}/{total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AwardCard;
