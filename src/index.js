class Site {
    constructor () {
        this.boards = [];
    };

    addBoard(board) {
        let [existName] = this.boards.filter(who => who.name === board.name)
        if (existName) {
            throw new Error();
        }
        board.added = true;
        this.boards.push(board);
    };
    //인자를 넣은 Board 클래스로 생성한 객체가
    //인자를 넣은 메서드 findBoardByName의
    //출력값과 같아야 한다.
    
    findBoardByName(board) {
        for (let i = 0; i < this.boards.length; i++) { //this.boards는 객체를 담은 배열이므로 길이만큼 반복.
           if (this.boards[i].name === board) { //board, 즉 인자가 name이다.
               return this.boards[i]; //객체 자체를 반환.
           }  
        }
    };

};

class Board {
    constructor (name, added) {
        if (!name) {
            throw new Error();
        }
        this.name = name;
        this.added = added;
        this.articles = [];
    };
    // Site의 this.boards 목록에 있는 Board에만 Article을 publish할 수 있다.
    // 테스트 코드에서 Site도 생성해 주고, Board도 추가해 준다.
    // Board에 매개변수로 added라는, 불리언을 받아오는 키값을 생성하여 해결. 
    publish (article) {
        if (!this.added === true) {
            throw new Error()
        }; article.id = `${this.name}-${Math.random()}`;
        let nowDate = new Date();
        article.createdDate = nowDate.toISOString();
        article.articleAdded = true;
        this.articles.push(article);
    }; // new Date()는 객체이므로 typeof를 써서 보면 object로 나온다.toISOString 메서드를 이용해 형식을 바꿔주자.
    // publish를 실행할 때 Article에 ID, createdDate 자동생성

    getAllArticles () {
        return this.articles;
    };
};

class Article {
    constructor (info, id, createdDate, articleAdded) {
        if (!info.subject || !info.content ||!info.author) {
            throw new Error();
        };
        this.subject = info.subject;
        this.content = info.content;
        this.author = info.author;
        this.id = id;
        this.createdDate = createdDate;
        this.articleAdded = articleAdded;
        this.comments = []; 
    };

    reply (comment) {
        if (!this.articleAdded === true) {
            throw new Error();
        };
        let nowDate = new Date();
        comment.createdDate = nowDate.toISOString();
        comment.articleAdded = true;
        this.comments.push(comment);
    };
    
    getAllComments () {
        return this.comments;
    };

};

class Comment {
    constructor (info, createdDate) {
        if (!info.content || !info.author) {
            throw new Error();
        };
        
        this.content = info.content;
        this.author = info.author;
        this.createdDate = createdDate;
    };
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
