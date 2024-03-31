'use client'

const UserItem = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="avatar rounded-full min-h-12 min-w-12 bg-emerald-500 flex items-center justify-center">
        <p className="text-white font-bold">SF</p>
      </div>
      <div>
        <p className="font-bold">Syed Faysel</p>
        <p>faysel@ecosync.com</p>
      </div>
    </div>
  );
};

export default UserItem;