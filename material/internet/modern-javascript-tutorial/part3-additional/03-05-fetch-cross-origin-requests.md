# Fetch: Cross-Origin Requests

## ❌ 복습

## 서론

만약 다른 사이트로 `fetch` 요청을 보내면 실패할 것이다. 주요 개념은 **origin**(도메인/포트/프로토콜)이다. Cross-origin 요청은 다른 리모트로부터 요청이 왔을 때 특별한 헤더를 요구한다.

정책은 CORS (Cross-Origin Resource Sharing)이라 부른다.

## why is CORS needed? A brief history

CORS는 나쁜 해커로부터 인터넷을 보호하기 위해 존재한다.

역사적으로, 수년간 한 사이트에서의 스크립트는 다른 사이트의 컨텐츠 접근은 할 수 없었다. 예를들어 A사이트에서 gmail.com의 웹사이트를 제어하지는 못한다. 사람들은 이에 안전함을 느낀다.

TOOD:

## Simple requests

## CORS for simple requests

## Response headers

## "Non-simple" requests

## Credentials

## Summary

## Tasks

## Comments
