import React from 'react'

export default function App() {
  // ... (aquí van tus hooks, dejalos como los tenías: useState de activeDay, workoutData, etc.)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-12 safe-bottom">
      {/* 1. Header Fijo superior */}
      <header className="px-4 pt-3 pb-2 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-900/60 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-red-500 animate-pulse text-lg">⏱</span>
            <span className="font-mono text-xl font-bold tracking-tight">
              {/* Tu función de formateo de tiempo aquí: ej. formatTime(workoutSeconds) */}
              00:00
            </span>
          </div>
          
          <button 
            onClick={toggleTraining}
            className="flex items-center gap-2 bg-white text-slate-950 px-4 py-2 rounded-full font-bold text-sm shadow-md hover:scale-95 transition-transform active:bg-slate-200"
          >
            <span>▶</span> Iniciar Entrenamiento
          </button>
        </div>

        {/* Selector de días tipo "Pills" */}
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

      {/* Cuerpo principal */}
      <main className="flex-1 px-4 py-4 flex flex-col gap-6 max-w-md mx-auto w-full">
        {/* Título de la rutina */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">Pecho, Hombros y Tríceps</h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{selectedDay}</p>
        </div>

        {/* Tarjetas de Ejercicios */}
        <div className="flex flex-col gap-5">
          {workoutData[selectedDay]?.map((exercise) => (
            <div 
              key={exercise.id} 
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 shadow-xl flex flex-col gap-4 backdrop-blur-sm"
            >
              {/* Encabezado del ejercicio */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-bold text-lg text-white tracking-tight leading-tight">
                    {exercise.name}
                  </h3>
                  <span className="text-xs font-semibold text-slate-500 mt-1 block">
                    {exercise.muscle}
                  </span>
                </div>
                
                {/* Botón de descanso más compacto */}
                <button className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 px-3 py-1.5 rounded-full text-xs font-semibold active:scale-95 transition-all">
                  <span>⏱</span> 90s Rest
                </button>
              </div>

              {/* Grid de Series */}
              <div className="flex flex-col gap-3">
                {/* Encabezado de columnas alineado */}
                <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">
                  <span className="col-span-2 text-center">SERIE</span>
                  <span className="col-span-4 text-center">CARGA</span>
                  <span className="col-span-3 text-center">REPS</span>
                  <span className="col-span-3 text-center">RIR</span>
                </div>

                {/* Filas de series */}
                {exercise.sets.map((set, index) => (
                  <div 
                    key={index} 
                    className="grid grid-cols-12 gap-2 items-center bg-slate-950/40 p-1.5 rounded-xl border border-slate-900/50"
                  >
                    {/* Número de Serie */}
                    <span className="col-span-2 text-center font-bold text-xs text-slate-400">
                      S{index + 1}
                    </span>

                    {/* Input Carga */}
                    <div className="col-span-4 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-2 flex items-center justify-between focus-within:border-blue-500/50">
                      <input
                        type="text"
                        placeholder="0"
                        value={set.weight || ''}
                        onChange={(e) => updateSet(exercise.id, index, 'weight', e.target.value)}
                        className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                      />
                    </div>

                    {/* Input Reps */}
                    <div className="col-span-3 bg-slate-900/80 border border-slate-800 rounded-lg py-1.5 px-1 focus-within:border-blue-500/50">
                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder="0"
                        value={set.reps || ''}
                        onChange={(e) => updateSet(exercise.id, index, 'reps', e.target.value)}
                        className="w-full bg-transparent text-center font-bold text-white text-xs focus:outline-none"
                      />
                    </div>

                    {/* Input RIR / Fallo */}
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
          ))}
        </div>
      </main>
    </div>
  )
}