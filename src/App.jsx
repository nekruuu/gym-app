import React, { useState, useEffect } from 'react'

export default function App() {
  const [selectedDay, setSelectedDay] = useState('Martes')
  const [isTraining, setIsTraining] = useState(false)
  const [workoutSeconds, setWorkoutSeconds] = useState(0)

  // Estado para controlar los descansos independientes por ejercicio
  const [restTimers, setRestTimers] = useState({})

  // Datos completos de tu rutina semanal
  const [workoutData, setWorkoutData] = useState({
    Martes: [
      {
        id: 'mar-1',
        name: 'Inclinado',
        muscle: 'Pecho',
        sets: [
          { weight: '10kg/lado', reps: 'Calentamiento', rir: '' },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' }
        ]
      },
      {
        id: 'mar-2',
        name: 'Peck Deck',
        muscle: 'Pecho',
        sets: [
          { weight: '60kg', reps: '9', rir: 'Fallo' },
          { weight: '55kg', reps: '6', rir: 'Fallo' }
        ]
      },
      {
        id: 'mar-3',
        name: 'Laterales en polea',
        muscle: 'Hombro',
        sets: [
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' }
        ]
      },
      {
        id: 'mar-4',
        name: 'Tricep polea media/baja',
        muscle: 'Tríiceps',
        sets: [
          { weight: '30kg', reps: '9', rir: 'Fallo' },
          { weight: '30kg', reps: '7', rir: 'Fallo' }
        ]
      },
      {
        id: 'mar-5',
        name: 'Tricep polea alta',
        muscle: 'Tríiceps',
        sets: [
          { weight: '3 ladrillos', reps: '6', rir: 'Fallo' },
          { weight: '2 ladrillos', reps: '8', rir: 'Fallo' },
          { weight: '2 ladrillos', reps: '8', rir: 'Fallo' }
        ]
      },
      {
        id: 'mar-6',
        name: 'Abs polea alta',
        muscle: 'Abdomen',
        sets: [
          { weight: '50kg', reps: '15', rir: 'Fallo' },
          { weight: '50kg', reps: '15', rir: 'Fallo' }
        ]
      }
    ],
    Miércoles: [
      {
        id: 'mie-1',
        name: 'Máquina gemelos',
        muscle: 'Gemelos',
        sets: [
          { weight: '40kg', reps: '', rir: '' },
          { weight: '70kg', reps: '', rir: '' },
          { weight: '70kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'mie-2',
        name: 'Máquina aductores',
        muscle: 'Aductores',
        sets: [
          { weight: '30kg', reps: '', rir: '' },
          { weight: '40kg', reps: '', rir: '' },
          { weight: '40kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'mie-3',
        name: 'Sillón cuádriceps',
        muscle: 'Cuádriceps',
        sets: [
          { weight: '50kg', reps: '', rir: '' },
          { weight: '80kg', reps: '', rir: '' },
          { weight: '80kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'mie-4',
        name: 'Péndulo',
        muscle: 'Cuádriceps',
        sets: [
          { weight: '20kg', reps: '', rir: '' },
          { weight: '20kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'mie-5',
        name: 'Máquina isquios sentado',
        muscle: 'Isquios',
        sets: [
          { weight: '50kg', reps: '', rir: '' },
          { weight: '70kg', reps: '', rir: '' },
          { weight: '70kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'mie-6',
        name: 'Abs polea alta',
        muscle: 'Abdomen',
        sets: [
          { weight: '50kg', reps: '15', rir: 'Fallo' },
          { weight: '50kg', reps: '15', rir: 'Fallo' }
        ]
      }
    ],
    Jueves: [
      {
        id: 'jue-1',
        name: 'Pullover en máquina',
        muscle: 'Espalda',
        sets: [
          { weight: '25kg/lado', reps: '', rir: '' },
          { weight: '45kg/lado', reps: '', rir: '' },
          { weight: '45kg/lado', reps: '', rir: '' }
        ]
      },
      {
        id: 'jue-2',
        name: 'Jalón al pecho agarre cerrado',
        muscle: 'Espalda',
        sets: [
          { weight: '65kg', reps: '', rir: '' },
          { weight: '65kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'jue-3',
        name: 'Barra T',
        muscle: 'Espalda',
        sets: [
          { weight: '35kg', reps: '', rir: '' },
          { weight: '35kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'jue-4',
        name: 'Curl predicador en máquina',
        muscle: 'Bíceps',
        sets: [
          { weight: '20kg', reps: '', rir: '' },
          { weight: '30kg', reps: '', rir: '' },
          { weight: '30kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'jue-5',
        name: 'Bicep alternado sentado',
        muscle: 'Bíceps',
        sets: [
          { weight: '15kg/lado', reps: '', rir: '' },
          { weight: '15kg/lado', reps: '', rir: '' }
        ]
      },
      {
        id: 'jue-6',
        name: 'Laterales en polea',
        muscle: 'Hombro',
        sets: [
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' }
        ]
      },
      {
        id: 'jue-7',
        name: 'Antebrazo polea baja',
        muscle: 'Antebrazo',
        sets: [
          { weight: '25kg', reps: '', rir: '' },
          { weight: '25kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'jue-8',
        name: 'Antebrazo polea alta',
        muscle: 'Antebrazo',
        sets: [
          { weight: '50kg', reps: '', rir: '' },
          { weight: '50kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'jue-9',
        name: 'Abs polea alta',
        muscle: 'Abdomen',
        sets: [
          { weight: '50kg', reps: '15', rir: 'Fallo' },
          { weight: '50kg', reps: '15', rir: 'Fallo' }
        ]
      }
    ],
    Viernes: [
      {
        id: 'vie-1',
        name: 'Máquina gemelos',
        muscle: 'Gemelos',
        sets: [
          { weight: '40kg', reps: '', rir: '' },
          { weight: '70kg', reps: '', rir: '' },
          { weight: '70kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'vie-2',
        name: 'Máquina aductores',
        muscle: 'Aductores',
        sets: [
          { weight: '30kg', reps: '', rir: '' },
          { weight: '40kg', reps: '', rir: '' },
          { weight: '40kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'vie-3',
        name: 'Isquios parado',
        muscle: 'Isquios',
        sets: [
          { weight: '10kg/lado', reps: '', rir: '' },
          { weight: '20kg/lado', reps: '', rir: '' },
          { weight: '20kg/lado', reps: '', rir: '' }
        ]
      },
      {
        id: 'vie-4',
        name: 'Máquina isquios sentado',
        muscle: 'Isquios',
        sets: [
          { weight: '70kg', reps: '', rir: '' },
          { weight: '70kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'vie-5',
        name: 'Sillón cuádriceps',
        muscle: 'Cuádriceps',
        sets: [
          { weight: '50kg', reps: '', rir: '' },
          { weight: '80kg', reps: '', rir: '' },
          { weight: '80kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'vie-6',
        name: 'Abs polea alta',
        muscle: 'Abdomen',
        sets: [
          { weight: '50kg', reps: '15', rir: 'Fallo' },
          { weight: '50kg', reps: '15', rir: 'Fallo' }
        ]
      }
    ],
    Sábado: [
      {
        id: 'sab-1',
        name: 'Inclinado',
        muscle: 'Pecho',
        sets: [
          { weight: '10kg/lado', reps: 'Calentamiento', rir: '' },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' },
          { weight: '22.5kg/lado', reps: '8', rir: 'RIR 0' }
        ]
      },
      {
        id: 'sab-2',
        name: 'Jalón al pecho agarre cerrado',
        muscle: 'Espalda',
        sets: [
          { weight: '40kg', reps: '', rir: '' },
          { weight: '65kg', reps: '', rir: '' },
          { weight: '65kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'sab-3',
        name: 'Peck Deck',
        muscle: 'Pecho',
        sets: [
          { weight: '60kg', reps: '9', rir: 'Fallo' },
          { weight: '55kg', reps: '6', rir: 'Fallo' }
        ]
      },
      {
        id: 'sab-4',
        name: 'Barra T',
        muscle: 'Espalda',
        sets: [
          { weight: '35kg', reps: '', rir: '' },
          { weight: '35kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'sab-5',
        name: 'Laterales en polea',
        muscle: 'Hombro',
        sets: [
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' },
          { weight: '2 ladrillos', reps: '9', rir: 'Fallo' }
        ]
      },
      {
        id: 'sab-6',
        name: 'Tricep polea media/baja',
        muscle: 'Tríiceps',
        sets: [
          { weight: '20kg', reps: '', rir: '' },
          { weight: '30kg', reps: '9', rir: 'Fallo' },
          { weight: '30kg', reps: '7', rir: 'Fallo' }
        ]
      },
      {
        id: 'sab-7',
        name: 'Curl predicador en máquina',
        muscle: 'Bíceps',
        sets: [
          { weight: '20kg', reps: '', rir: '' },
          { weight: '30kg', reps: '', rir: '' },
          { weight: '30kg', reps: '', rir: '' }
        ]
      },
      {
        id: 'sab-8',
        name: 'Abs polea alta',
        muscle: 'Abdomen',
        sets: [
          { weight: '50kg', reps: '15', rir: 'Fallo' },
          { weight: '50kg', reps: '15', rir: 'Fallo' }
        ]
      }
    ]
  })

  const dayTitles = {
    Martes: 'Pecho, Hombros y Tríceps',
    Miércoles: 'Pierna Completa',
    Jueves: 'Espalda, Bíceps y Antebrazo',
    Viernes: 'Pierna y Enfoque Isquios',
    Sábado: 'Torso Completo'
  }

  // Timer general del entrenamiento
  useEffect(() => {
    let interval = null
    if (isTraining) {
      interval = setInterval(() => {
        setWorkoutSeconds((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTraining])

  // Manejo de los temporizadores de descanso de 90 segundos
  useEffect(() => {
    const timerKeys = Object.keys(restTimers)
    if (timerKeys.length === 0) return

    const interval = setInterval(() => {
      setRestTimers((prev) => {
        const nextTimers = { ...prev }
        let updated = false

        Object.keys(nextTimers).forEach((id) => {
          if (nextTimers[id] > 1) {
            nextTimers[id] = nextTimers[id] - 1
            updated = true
          } else if (nextTimers[id] === 1) {
            // El tiempo llegó a 0: Hacer vibrar 2 veces
            if (typeof window !== 'undefined' && 'vibrate' in navigator) {
              navigator.vibrate([200, 100, 200]) // Vibrar 200ms, pausa 100ms, vibrar 200ms
            }
            delete nextTimers[id] // Elimina el timer y reinicia el botón
            updated = true
          }
        })

        return updated ? nextTimers : prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [restTimers])

  const startRestTimer = (exerciseId) => {
    // Si ya está activo, cancelarlo/reiniciarlo
    if (restTimers[exerciseId]) {
      setRestTimers((prev) => {
        const copy = { ...prev }
        delete copy[exerciseId]
        return copy
      })
    } else {
      // Iniciar en 90 segundos
      setRestTimers((prev) => ({ ...prev, [exerciseId]: 90 }))
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleTraining = () => {
    setIsTraining(!isTraining)
  }

  const updateSet = (exerciseId, setIndex, field, value) => {
    setWorkoutData((prevData) => {
      const currentDayData = prevData[selectedDay] || []
      const updatedDayData = currentDayData.map((exercise) => {
        if (exercise.id === exerciseId) {
          const updatedSets = exercise.sets.map((set, idx) => {
            if (idx === setIndex) {
              return { ...set, [field]: value }
            }
            return set
          })
          return { ...exercise, sets: updatedSets }
        }
        return exercise
      })
      return { ...prevData, [selectedDay]: updatedDayData }
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-12 safe-bottom">
      {/* Header Fijo */}
      <header className="px-4 pt-3 pb-2 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/60 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 animate-pulse text-lg">⏱</span>
            <span className="font-mono text-xl font-bold tracking-tight">
              {formatTime(workoutSeconds)}
            </span>
          </div>

          <button
            onClick={toggleTraining}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm shadow-md transition-transform active:scale-95 ${
              isTraining
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-white text-slate-950 hover:bg-slate-200'
            }`}
          >
            <span>{isTraining ? '⏸' : '▶'}</span>
            {isTraining ? 'Pausar' : 'Iniciar Entrenamiento'}
          </button>
        </div>

        {/* Selector de Días */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {['Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDay === day
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-6 max-w-md mx-auto w-full">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">{dayTitles[selectedDay]}</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{selectedDay}</p>
        </div>

        {/* Lista de Ejercicios */}
        <div className="flex flex-col gap-5">
          {workoutData[selectedDay]?.map((exercise) => {
            const currentRest = restTimers[exercise.id]

            return (
              <div
                key={exercise.id}
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 shadow-xl flex flex-col gap-4 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="font-bold text-lg text-white tracking-tight leading-tight">
                      {exercise.name}
                    </h3>
                    <span className="text-xs font-semibold text-slate-500 mt-1 block">
                      {exercise.muscle}
                    </span>
                  </div>

                  {/* Botón de descanso interactivo */}
                  <button
                    onClick={() => startRestTimer(exercise.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all ${
                      currentRest
                        ? 'bg-orange-500 text-slate-950 font-bold animate-pulse shadow-lg shadow-orange-500/20'
                        : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10'
                    }`}
                  >
                    <span>⏱</span>
                    {currentRest ? `${currentRest}s Rest` : '90s Rest'}
                  </button>
                </div>

                {/* Filas de Series */}
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                    <span className="col-span-2 text-center">SERIE</span>
                    <span className="col-span-4 text-center">CARGA</span>
                    <span className="col-span-3 text-center">REPS</span>
                    <span className="col-span-3 text-center">RIR</span>
                  </div>

                  {exercise.sets.map((set, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-12 gap-2 items-center bg-slate-950/40 p-1.5 rounded-xl border border-slate-900/50"
                    >
                      <span className="col-span-2 text-center font-bold text-xs text-slate-400">
                        S{index + 1}
                      </span>

                      <div className="col-span-4 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-2 flex items-center justify-between focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.weight || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'weight', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="col-span-3 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1 focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="0"
                          value={set.reps || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'reps', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="col-span-3 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1 focus-within:border-blue-500/50">
                        <input
                          type="text"
                          placeholder="RIR 0"
                          value={set.rir || ''}
                          onChange={(e) => updateSet(exercise.id, index, 'rir', e.target.value)}
                          className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}