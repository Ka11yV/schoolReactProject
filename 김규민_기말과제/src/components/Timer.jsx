import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Coffee, BookOpen } from "lucide-react";

function Button({ onClick, children, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded px-3 py-1 text-sm font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-lg shadow bg-white ${className}`}>{children}</div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

function CardHeader({ children }) {
  return <div className="border-b px-6 py-4">{children}</div>;
}

function CardTitle({ children }) {
  return <h2 className="text-lg font-bold">{children}</h2>;
}

function Timer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSec) => {
          if (prevSec > 0) return prevSec - 1;

          return 59;
        });

        setMinutes((prevMin) => {
          if (seconds === 0) {
            if (prevMin === 0) {
              clearInterval(intervalRef.current);
              setIsActive(false);

              // 세션 전환
              if (!isBreak) {
                setSessions((s) => s + 1);
                setIsBreak(true);
                return 5;
              } else {
                setIsBreak(false);
                return 25;
              }
            }
            return prevMin - 1;
          }
          return prevMin;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isBreak, seconds]);

  useEffect(() => {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  const formatTime = (m, s) =>
    `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;

  const totalTime = isBreak ? 5 * 60 : 25 * 60; // 총 시간 (초)
  const remainingTime = minutes * 60 + seconds; // 남은 시간 (초)
  const elapsedTime = totalTime - remainingTime; // 경과 시간 (초)

  const progress = isActive ? (elapsedTime / totalTime) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">타이머</h1>
          <p className="text-gray-600">
            25분 집중, 5분 휴식으로 생산성을 높여보세요
          </p>
        </div>

        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent>
            <div className="text-center">
              {/* 상태 뱃지 */}
              <div className="mb-6">
                <Badge
                  className={`text-lg px-4 py-2 ${
                    isBreak
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isBreak ? (
                    <>
                      <Coffee className="h-5 w-5 mr-2" />
                      휴식 시간
                    </>
                  ) : (
                    <>
                      <BookOpen className="h-5 w-5 mr-2" />
                      집중 시간
                    </>
                  )}
                </Badge>
              </div>

              {/* 타이머 숫자 및 진행률 */}
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-gray-800 mb-2">
                  {formatTime(minutes, seconds)}
                </div>
                <div className="text-sm text-gray-600">
                  {isActive
                    ? `${Math.round(progress)}% 완료`
                    : "타이머를 시작하세요"}
                </div>
              </div>

              {/* 컨트롤 버튼 */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={toggleTimer}
                  className={`px-8 text-white ${
                    isActive
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isActive ? (
                    <>
                      <Pause className="h-5 w-5 mr-2" />
                      일시정지
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5 mr-2" />
                      시작
                    </>
                  )}
                </Button>

                <Button
                  onClick={resetTimer}
                  className="px-8 border border-gray-400 bg-white text-gray-800 hover:bg-gray-100"
                >
                  <RotateCcw className="h-5 w-5 mr-2" />
                  리셋
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>오늘의 성과</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {sessions}
                </div>
                <div className="text-sm text-gray-600">완료된 세션</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {sessions * 25}
                </div>
                <div className="text-sm text-gray-600">집중한 시간 (분)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Timer;
