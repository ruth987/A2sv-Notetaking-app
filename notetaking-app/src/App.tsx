import NoteForm from "./features/NoteForm"
import NoteList from "./features/NoteList"

function App() {

  return (
    <div>
      <h1 className="text-4xl text-center font-semibold text-blue-600 mb-4">
      NoteListing
        <span className="text-gray-600">App</span> 
      </h1>

      <NoteForm />
      <NoteList />

    </div>
  )
}

export default App
