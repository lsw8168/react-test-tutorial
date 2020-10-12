# Cypress 5.3.0 설치

## Test 종류

* 단위테스트
* 통합테스트
* E2E 테스트

## 단위/통합 테스트

개발자의 관점에서 테스트를 하는 경우를 뜻한다.  
서비스 로직을 실행했을 때, 알맞은 데이터를 제공하는지 또는 올바른 로직을 수행하는지를 테스트한다고 볼 수 있다.

## E2E Test - End To End Test

* E2E Test는 종단(Endpoint) 간 테스트로 사용자의 입장에서 테스트 하는 것
* 보통 Web, App 등에서 GUI를 통해서 시나리오, 기능 테스트 등을 수행
* 사용자에게 직접 노출되는 부분을 점검한다고 생각하면 됨

## 장점

## 단점

## install

* 프로젝트에서 install

```npm
npm install cypress --save-dev
```

## Cypress 초기화

```npm
node_modules/.bin/cypress open

npx cypress open
```

* 프로젝트 root 폴더에 cypress 폴더가 생성
* cypress/integration/examples 폴더 아래 cypress를 사용하여 테스트 예제 코드 생성

### cypress.json

* 프로젝트 폴더아래 cypress.json파일이 생성
* cypress의 기본 url을 설정(localUrl port 동일하게 설정)

```js
{
  "baseUrl": "http://localhost:3030"
}
```

### Adding npm scripts

```js
...
{
  "scripts": {
    "cypress": "cypress open"
  }
}
...

npm run cypress
```

## json-server

```
### routes.json을 활용해서 routes 경로를 수정할 수 있다.

...
"serve": "json-server db.json --routes routes.json",
"dev": "concurrently \"npm run start\" \"npm run serve\""
...
```
https://github.com/typicode/json-server


## 참고 사이트

* https://medium.com/hbsmith/selenium%EC%97%90%EC%84%9C-cypress%EB%A1%9C-%EA%B0%88%EC%95%84%ED%83%84-%ED%9B%84%EA%B8%B0-324f224c14db
* https://gogomalibu.tistory.com/138
* https://github.com/adhrinae/react-testing-tutorial-kr/blob/master/translations/ch10.md
* https://velog.io/@sdong001/%EC%8B%A4%EC%9A%A9%EC%A0%81%EC%9D%B8-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8-%EC%A0%84%EB%9E%B5
* https://meetup.toast.com/posts/180
