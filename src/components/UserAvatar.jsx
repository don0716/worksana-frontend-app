// components/UserAvatar.jsx
const getInitials = (name) => {
  const names = name.trim().split(' ');
  return names.length > 1
    ? names[0][0].toUpperCase() + names[1][0].toUpperCase()
    : names[0][0].toUpperCase();
};

const getAvatarColor = (name) => {
  const colors = ['#f97316', '#16a34a', '#0d9488', '#eab308', '#8b5cf6'];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

const UserAvatar = ({ members }) => {
  return (
    <div className="d-flex align-items-center mt-2">
      <div className="d-flex">
        {members.slice(0, 3).map((user, index) => (
          <div
            key={index}
            className="rounded-circle text-white d-flex justify-content-center align-items-center border border-white"
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: getAvatarColor(user.name),
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginLeft: index !== 0 ? '-10px' : '0',
              zIndex: 10 - index,
            }}
            title={user.name}
          >
            {getInitials(user.name)}
          </div>
        ))}
        {members.length > 3 && (
          <div
            className="rounded-circle bg-light border d-flex justify-content-center align-items-center"
            style={{
              width: '32px',
              height: '32px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginLeft: '-10px',
              zIndex: 1,
            }}
          >
            +{members.length - 3}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
