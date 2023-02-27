import { Rating } from '../../../components/Rating'

const Loading = () => {
  return (
    <div className="flex flex-col gap-4 pt-8">
      <div className="rounded-lg bg-slate-200 w-36 h-52" />
      <div className="h-12 w-full bg-slate-200 rounded" />
      <div className="h-8 w-36 bg-slate-200 rounded" />
      <Rating ratingsCount={0} rating={0} />
    </div>
  )
}

export default Loading
