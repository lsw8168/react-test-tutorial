# Cypress 5.3.0 설치

## E2E Test

* E2E Test(End To End Test)
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
  "baseUrl": "http://localhost:3000"
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
