import React, { useState, useEffect } from 'react'
import { ROUTINE_DATA } from './data/routineData'
import { Play, Square, Dumbbell, Clock, Timer } from 'lucide-react'
import confetti from 'canvas-confetti'

export default function App() {
  const days = ['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const [selectedDay, setSelectedDay] = useState('Martes')
  
  // Timer de Entrenamiento
  const [isTraining, setIsTraining] = useState(false)
  const [workoutSeconds, setWorkoutSeconds] = useState(0)

  // Timer de Descanso
  const [restSeconds, setRestSeconds] = useState(0)
  const [isRestActive, setIsRestActive] = useState(false)

  // Registro de Sets por ejercicio
  const [workoutData, setWorkoutData] = useState({})

  // Cronómetro principal
  useEffect(() => {
    let interval = null
    if (isTraining) {
      interval = setInterval(() => {
        setWorkoutSeconds(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTraining])

  // Cronómetro de descanso
  useEffect(() => {
    let restInterval = null
    if (isRestActive && restSeconds > 0) {
      restInterval = setInterval(() => {
        setRestSeconds(prev => prev - 1)
      }, 1000)
    } else if (restSeconds === 0 && isRestActive) {
      setIsRestActive(false)
      if (navigator.vibrate) navigator.vibrate([200, 100, 200])
    }
    return () => clearInterval(restInterval)
  }, [isRestActive, restSeconds])

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`
  }

  const startWorkout = () => {
    setIsTraining(true)
    setWorkoutSeconds(0)
  }

  const finishWorkout = () => {
    setIsTraining(false)
    setIsRestActive(false)
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    alert(`¡Entrenamiento finalizado! Tiempo total: ${formatTime(workoutSeconds)}`)
  }

  const triggerRestTimer = (seconds = 90) => {
    setRestSeconds(seconds)
    setIsRestActive(true)
  }

  const handleSetChange = (exerciseId, setIndex, field, value) => {
    setWorkoutData(prev => {
      const currentEx = prev[exerciseId] || [
        { weight: '', reps: '', rir: 'RIR 0' },
        { weight: '', reps: '', rir: 'RIR 0' },
        { weight: '', reps: '', rir: 'RIR 0' }
      ]
      const updatedEx = [...currentEx]
      updatedEx[setIndex] = { ...updatedEx[setIndex], [field]: value }
      return { ...prev, [exerciseId]: updatedEx }
    })
  }

  const currentRoutine = ROUTINE_DATA[selectedDay]

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 p-4 pb-24 max-w-md mx-auto font-sans">
      {/* Header & Status */}
      <header className="flex justify-between items-center mb-6 pt-2">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Dumbbell className="text-emerald-500" /> GYM PRO
          </h1>
          <p className="text-xs text-gray-400">Control de Sobrecarga Progresiva</p>
        </div>
        
        {/* Contador de Tiempo Activo */}
        <div className="bg-dark-card border border-dark-border px-3 py-1.5 rounded-xl flex items-center gap-2">
          <Clock className={`w-4 h-4 ${isTraining ? 'text-emerald-400 animate-pulse' : 'text-gray-400'}`} />
          <span className="font-mono text-sm font-bold">{formatTime(workoutSeconds)}</span>
        </div>
      </header>

      {/* Botón Iniciar / Terminar Sesión */}
      <div className="mb-6">
        {!isTraining ? (
          <button 
            onClick={startWorkout} 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Play className="fill-current w-5 h-5" /> Iniciar Entrenamiento
          </button>
        ) : (
          <button 
            onClick={finishWorkout} 
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg shadow-red-900/30 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Square className="fill-current w-4 h-4" /> Finalizar Entrenamiento
          </button>
        )}
      </div>

      {/* Selector de Días */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedDay === day 
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-500/20' 
                : 'bg-dark-card text-gray-400 border border-dark-border'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Título de la Rutina Seleccionada */}
      <div className="bg-gradient-to-r from-emerald-900/40 to-dark-card p-4 rounded-2xl border border-emerald-500/20 mb-6">
        <span className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">{selectedDay}</span>
        <h2 className="text-lg font-bold text-white">{currentRoutine.title}</h2>
      </div>

      {/* Temporizador de Descanso Flotante */}
      {isRestActive && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-6 py-2 rounded-full shadow-2xl font-bold flex items-center gap-2 z-50 animate-bounce">
          <Timer className="w-5 h-5" /> Descanso: {formatTime(restSeconds)}
        </div>
      )}

      {/* Lista de Ejercicios */}
      <div className="space-y-4">
        {currentRoutine.exercises.map((ex) => {
          const sets = workoutData[ex.id] || [
            { weight: ex.defaultWeight, reps: '8', rir: 'RIR 0' },
            { weight: ex.defaultWeight, reps: '8', rir: 'RIR 0' },
            { weight: ex.defaultWeight, reps: '8', rir: 'Fallo' }
          ]

          return (
            <div key={ex.id} className="bg-dark-card border border-dark-border rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="font-bold text-white text-base">{ex.name}</h3>
                  <span className="text-xs text-gray-400">{ex.muscle}</span>
                </div>
                <button 
                  onClick={() => triggerRestTimer(90)}
                  className="bg-dark-input hover:bg-gray-800 text-emerald-400 text-xs px-2.5 py-1.5 rounded-lg border border-dark-border flex items-center gap-1"
                >
                  <Timer className="w-3 h-3" /> 90s Rest
                </button>
              </div>

              {/* Encabezado de Series */}
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] uppercase font-bold text-gray-400 mb-2">
                <span>Serie</span>
                <span>Carga</span>
                <span>Reps</span>
                <span>RIR</span>
              </div>

              {/* Filas de Series */}
              {sets.map((set, setIdx) => (
                <div key={setIdx} className="grid grid-cols-4 gap-2 mb-2 items-center">
                  <span className="text-xs font-bold text-emerald-400 text-center bg-dark-bg py-2 rounded-lg border border-dark-border">
                    S{setIdx + 1}
                  </span>
                  <input
                    type="text"
                    value={set.weight}
                    onChange={(e) => handleSetChange(ex.id, setIdx, 'weight', e.target.value)}
                    className="bg-dark-input text-white text-xs text-center py-2 rounded-lg border border-dark-border focus:border-emerald-500 outline-none"
                  />
                  <input
                    type="text"
                    value={set.reps}
                    onChange={(e) => handleSetChange(ex.id, setIdx, 'reps', e.target.value)}
                    className="bg-dark-input text-white text-xs text-center py-2 rounded-lg border border-dark-border focus:border-emerald-500 outline-none"
                  />
                  <input
                    type="text"
                    value={set.rir}
                    onChange={(e) => handleSetChange(ex.id, setIdx, 'rir', e.target.value)}
                    className="bg-dark-input text-white text-xs text-center py-2 rounded-lg border border-dark-border focus:border-emerald-500 outline-none"
                  />
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}