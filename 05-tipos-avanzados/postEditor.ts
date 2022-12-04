interface User {
  name: string,
  lastName: string
  role: Record<number, string>
}

interface Post {
  id: number,
  title: string,
  createdAt: Date | string,
  author: User
}

interface PostLog {
  newPost: Post | undefined,
  oldPost: Post,
  editedBy: User,
  editedAt: number
}

type PostLogRepository = Record<number, PostLog>

const admin: User = {
  name: 'Jhon',
  lastName: 'Smith',
  role: ["1", 'Admin'],
};

const developer: User = {
  name: 'Jose',
  lastName: 'Cabrera',
  role: ["2", 'Developer'],
};

const editor: User = {
  name: 'Will',
  lastName: 'Doe',
  role: ["3", 'Editor'],
};

const POSTS: Post[] = [
  {
    id: 1,
    title: 'Aprender TypeScript',
    createdAt: '03/03/2020',
    author: developer,
  },
  {
    id: 2,
    title: 'Aprender JavaScript',
    createdAt: '18/03/2020',
    author: editor,
  },
  {
    id: 3,
    title: 'Es realmente TypeScript útil?',
    createdAt: '18/05/2020',
    author: admin,
  },
];


function isAdmin(person: User): boolean {
  return person.role[0] === "1" && person.role[1] === 'Admin';
}

function notHasPermissionLog(user: Pick<User, "name" | "role">, title: Pick<Post, "title">): void {
  console.log(`User ${user.name} with the role ${user.role[1]} has no permission to edit the post ${title}`);
}

const postLog: PostLogRepository = []
for (let index = 0; index < POSTS.length; index++) {
  const post = POSTS[index];
  if (isAdmin(post.author)) {
    if (!(post.id in postLog)) {
      postLog[post.id] = {editedAt: Date.now(), editedBy: admin, oldPost: post, newPost: undefined};
      const copyPost = JSON.parse(JSON.stringify(post));
      copyPost.title = '¿Es realmente TypeScript útil?';
      copyPost.author = admin;
      postLog[post.id].newPost = copyPost;
    }
  } else {
    notHasPermissionLog(post.author, post);
  }
}
console.log(postLog);
