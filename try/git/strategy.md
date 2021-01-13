# Git 브랜치 전략

`Git-flow`, `GitHub-flow`를 잘몰라서 알아보았다.

## Git flow

> 😎 일반적으로 사용하던 방법이라고 보면 되겠다.

Git-flow는 main(`master`) 브랜치가 배포 브랜치가 된다. 기능 개발은 여기서 처음 파생되어 진행되며 이 브랜치를 `develop`으로 칭한다. `develop`에서 feature 브랜치를 만들어 작업하며, 배포준비시에는 `release` 브랜치를 생성해 필요한 테스트를 수행후 버그를 픽스하고 이 결과는 `develop`으로 지속적으로 머지되며, 모든 수정이 끝나면 main(`master`)로 머지되며 배포한다.

https://nvie.com/posts/a-successful-git-branching-model/

## GitHub flow

## References

- [x] [우린 Git-flow를 사용하고 있어요](https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html)
- [ ] https://blog.lulab.net/programming-tools/the-need-for-a-git-branch-strategy/
- [ ] https://velog.io/@jinuku/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5
- [ ] https://medium.com/daangn/deploy-%EB%B8%8C%EB%9E%9C%EC%B9%98-%EC%A0%84%EB%9E%B5-%ED%99%9C%EC%9A%A9-%EB%B0%A9%EB%B2%95-545f278ca878
- [ ] https://hellowoori.tistory.com/56
- [ ] https://blog.ull.im/engineering/2019/06/25/git-workflow-for-ci-cd.html
- [ ] https://academy.realm.io/kr/posts/360andev-savvas-dalkitsis-using-git-like-a-pro/
- [ ] http://wiki.webnori.com/pages/viewpage.action?pageId=10813480
- [ ] http://blog.naver.com/PostView.nhn?blogId=tmondev&logNo=220763012361
- [ ] https://yhmane.tistory.com/106
