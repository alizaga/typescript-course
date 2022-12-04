var admin = {
    name: 'Jhon',
    lastName: 'Smith',
    role: ["1", 'Admin']
};
var developer = {
    name: 'Jose',
    lastName: 'Cabrera',
    role: ["2", 'Developer']
};
var editor = {
    name: 'Will',
    lastName: 'Doe',
    role: ["3", 'Editor']
};
var POSTS = [
    {
        id: 1,
        title: 'Aprender TypeScript',
        createdAt: '03/03/2020',
        author: developer
    },
    {
        id: 2,
        title: 'Aprender JavaScript',
        createdAt: '18/03/2020',
        author: editor
    },
    {
        id: 3,
        title: 'Es realmente TypeScript útil?',
        createdAt: '18/05/2020',
        author: admin
    },
];
function isAdmin(person) {
    return person.role[0] === "1" && person.role[1] === 'Admin';
}
function notHasPermissionLog(user, title) {
    console.log("User ".concat(user.name, " with the role ").concat(user.role[1], " has no permission to edit the post ").concat(title));
}
var postLog = [];
for (var index = 0; index < POSTS.length; index++) {
    var post = POSTS[index];
    if (isAdmin(post.author)) {
        if (!(post.id in postLog)) {
            postLog[post.id] = { editedAt: Date.now(), editedBy: admin, oldPost: post, newPost: undefined };
            var copyPost = JSON.parse(JSON.stringify(post));
            copyPost.title = '¿Es realmente TypeScript útil?';
            copyPost.author = admin;
            postLog[post.id].newPost = copyPost;
        }
    }
    else {
        notHasPermissionLog(post.author, post);
    }
}
console.log(postLog);
