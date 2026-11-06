import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {ResponsiveContainer} from "recharts"
import {
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area
} from "recharts";


function Step3Report({report}) {

  const navigate = useNavigate()

  if (!report) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 text-lg">
                Loading Report...
            </p>
        </div>
    );
  }

  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
      name: `Q${index + 1}`,
      score: score.score || 0
  }))

  const skills = [
      { label: "Confidence", value: confidence },
      { label: "Communication", value: communication },
      { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
      performanceText = "Ready for job opportunities.";
      shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
      performanceText = "Needs minor improvement before interviews.";
      shortTagline = "Good foundation, refine articulation.";
  } else {
      performanceText = "Significant improvement required.";
      shortTagline = "Work on clarity and confidence.";
  }

  const score=finalScore;
  const percentage=(score/10)*100; 


  return (
    <div className='min-h-screen bg-linear-to-br from-gray-50 to-green-50 px-4 sm:px-6 lg:px-10 py-8'>
      <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
         <div className='md:mb-10 w-full flex items-start gap-4 flex-wrap'>
              <button
                  onClick={() => navigate("/history")}
                  className='mt-1 p-3 rounded-full bg-white shadow hover:shadow-md transition'>
                  <FaArrowLeft className='text-gray-600'/>
              </button>
  
              <div>
                  <h1 className='text-3xl font-bold text-gray-800 flex-nowrap'>
                      Interview Analytics Dashboard
                  </h1>
                  <p className='text-gray-500 mt-2'>
                      AI-powered performance insights
                  </p>
              </div>
         </div>

         <button className='bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl shadow-md transition-all duration-300 font-semibold text-sm sm:text-base text-nowrap'>
            Download PDF
         </button>

      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
        <div className='space-y-6'>
          <motion.div
          initial={{opacity:0}}
          animate={{opacity:1}}
          className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8  text-center'>
              <h3 className='text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base'>Overall Performance</h3>
              <div className="relative w-20 h-20 sm:w-25 sm:h-25 mx-auto">
                <CircularProgressbar
                  value={percentage}
                  text={`${score}/10`}
                  styles={buildStyles({
                      textSize:"18px",
                      pathColor:"#3c4341",
                      textColor:"#ef4444",
                      trailColor:"#e5e7eb"
                  })}
                />
              </div>

              <p className="text-gray-400 mt-3 text-xs sm:text-sm">
                  Out of 10
              </p>

              <div className="mt-4">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {performanceText}
                  </p>

                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                      {shortTagline}
                  </p>
              </div>
          </motion.div>

          <motion.div
          initial={{opacity:0}}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8' >
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
                Skill Evaluation
            </h3>

            <div className='space-y-5'>
                {
                    skills.map((s, i) => (
                        <div key={i}>
                            <div className='flex justify-between mb-2 text-sm sm:text-base'>
                                <span>{s.label}</span>
                                <span className='font-semibold text-green-600'>
                                    {s.value}/10
                                </span>
                            </div>

                            <div className='bg-gray-200 rounded-full h-2 sm:h-3'>
                                <div
                                    className='bg-green-500 h-full rounded-full'
                                    style={{ width: `${s.value * 10}%` }}
                                ></div>
                            </div>
                        </div>
                    ))
                }
            </div>
          </motion.div>

        </div>
        <div className='lg:col-span-2 space-y-6'>
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
              <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
                  Performance Trend
              </h3>

              <div className='h-64 sm:h-72'>
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={questionScoreData}>
                          <CartesianGrid strokeDasharray="3 3"/>
                          <XAxis dataKey="name"/>
                          <YAxis domain={[0, 10]}/>
                          <Tooltip/>
                          <Area
                              type="monotone"
                              dataKey="score"
                              stroke="#22c55e"
                              fill="#bbf7d0"
                              strokeWidth={3}
                          />
                      </AreaChart>
                  </ResponsiveContainer>
              </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-8'>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-6">
                Question Breakdown
            </h3>

            <div className='space-y-6'>
                {questionWiseScore.map((q, i) => (
                    <div key={i}
                    className='bg-gray-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200'>
                        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4'>
                          <div>
                              <p className="text-xs text-gray-400">
                                  Question {i + 1}
                              </p>

                              <p className="font-semibold text-gray-800 text-sm sm:text-base leading-relaxed">
                                  {q.question || "Question not available"}
                              </p>
                          </div>

                          <div className='bg-green-100 text-green-600 px-3 py-1 rounded-full font-bold text-xs sm:text-sm w-fit'>
                              {q.score ?? 0}/10
                          </div>
                        </div>
                        <div>
                          <p>AI FEEDBACK</p>
                          <p className='text-sm text-gray-700 leading-relaxed'>
                              {q.feedback && q.feedback.trim() !== ""
                                  ? q.feedback
                                  : "No feedback available for this question."}
                          </p>
                        </div>
                    </div>
                ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default Step3Report
