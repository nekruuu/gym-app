// En tu mapeo de ejercicios dentro de App.jsx:
<div className="flex flex-col gap-4 p-4 max-w-md mx-auto">
  {exerciseList.map((exercise) => (
    <div 
      key={exercise.id} 
      className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg flex flex-col gap-3"
    >
      {/* Encabezado del ejercicio */}
      <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
        <h3 className="font-bold text-lg text-white tracking-wide">{exercise.name}</h3>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
          {exercise.muscleGroup}
        </span>
      </div>

      {/* Filas de Series (Sets) */}
      <div className="flex flex-col gap-2.5">
        {exercise.sets.map((set, index) => (
          <div 
            key={index} 
            className="grid grid-cols-12 gap-2 items-center bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50"
          >
            <span className="col-span-2 text-xs font-bold text-slate-400 text-center uppercase">
              S{index + 1}
            </span>

            {/* Carga / Cero drama si usás kg o lb */}
            <div className="col-span-5 flex items-center bg-slate-900 rounded-lg px-2 py-1.5 border border-slate-800">
              <input
                type="number"
                inputMode="decimal"
                placeholder="0"
                value={set.weight || ''}
                onChange={(e) => updateSet(exercise.id, index, 'weight', e.target.value)}
                className="w-full bg-transparent text-center font-semibold text-white focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 font-medium ml-1">kg</span>
            </div>

            {/* Repeticiones */}
            <div className="col-span-5 flex items-center bg-slate-900 rounded-lg px-2 py-1.5 border border-slate-800">
              <input
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={set.reps || ''}
                onChange={(e) => updateSet(exercise.id, index, 'reps', e.target.value)}
                className="w-full bg-transparent text-center font-semibold text-white focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 font-medium ml-1">reps</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>