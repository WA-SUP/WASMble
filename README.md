# WASMble

WASMble(와즘블) 프로젝트는 **자바스크립트 코드**와 **동일한 코드로 컴파일된 웹 어셈블리 모듈** 간 성능 비교를 시각화한 웹 어플리케이션입니다.

![wasmble-main](https://github.com/user-attachments/assets/58a39df1-49be-4eae-9943-231a1e62619e)

<br>
<div align="center">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/assemblyscript-007AAC?style=for-the-badge&logo=assemblyscript&logoColor=black">
<img src="https://img.shields.io/badge/webassembly-654FF0?style=for-the-badge&logo=webassembly&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=black">
<img src="https://img.shields.io/badge/next.js-black?style=for-the-badge&logo=next.js&logoColor=white">
<br>
<img src="https://img.shields.io/badge/prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=black">
<img src="https://img.shields.io/badge/supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=black">
<img src="https://img.shields.io/badge/tailwind CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=black">
<img src="https://img.shields.io/badge/chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=black">
<img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=black">
<img src="https://img.shields.io/badge/aws elastic beanstalk-e88c0c?style=for-the-badge&logo=&logoColor=black">

</div>

<br><br>

# 내비게이션

- [1. 프로젝트 소개](#1-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%86%8C%EA%B0%9C)
  - [1-1. 기획 동기](#1-1-%EA%B8%B0%ED%9A%8D-%EB%8F%99%EA%B8%B0)
  - [1-2. 개발 환경](#1-2-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD)
- [2. 구현 사항](#2-%EA%B5%AC%ED%98%84-%EC%82%AC%ED%95%AD)
  - [2-1. 자바스크립트를 어셈블리스크립트로, 어셈블리스크립트를 웹어셈블리로](#2-1-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A5%BC-%EC%9B%B9%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EB%A1%9C)
    - [[1] 어셈블리스크립트로 트랜스파일, 웹어셈블리로 컴파일](#1-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%ED%8A%B8%EB%9E%9C%EC%8A%A4%ED%8C%8C%EC%9D%BC-%EC%9B%B9%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EB%A1%9C-%EC%BB%B4%ED%8C%8C%EC%9D%BC)
    - [[2] 모든 자바스크립트 자료형을 어셈블리스크립트로 변환할 수 있을까?](#2-%EB%AA%A8%EB%93%A0-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%9E%90%EB%A3%8C%ED%98%95%EC%9D%84-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EB%B3%80%ED%99%98%ED%95%A0-%EC%88%98-%EC%9E%88%EC%9D%84%EA%B9%8C)
      - [메모리 관리 방식의 차이](#%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC-%EB%B0%A9%EC%8B%9D%EC%9D%98-%EC%B0%A8%EC%9D%B4)
      - [원시값 변환이 가능했던 이유](#%EC%9B%90%EC%8B%9C%EA%B0%92-%EB%B3%80%ED%99%98%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%96%88%EB%8D%98-%EC%9D%B4%EC%9C%A0)
  - [2-2. 자바스크립트 코드와 웹 어셈블리 모듈 간의 성능 비교 방법](#2-2-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BD%94%EB%93%9C%EC%99%80-%EC%9B%B9-%EC%96%B4%EC%85%88%EB%B8%94%EB%A6%AC-%EB%AA%A8%EB%93%88-%EA%B0%84%EC%9D%98-%EC%84%B1%EB%8A%A5-%EB%B9%84%EA%B5%90-%EB%B0%A9%EB%B2%95)
    - [초당 실행 횟수를 측정한 성능 비교](#%EC%B4%88%EB%8B%B9-%EC%8B%A4%ED%96%89-%ED%9A%9F%EC%88%98%EB%A5%BC-%EC%B8%A1%EC%A0%95%ED%95%9C-%EC%84%B1%EB%8A%A5-%EB%B9%84%EA%B5%90)
    - [연산 과정에서 사용된 메모리를 측정한 성능 비교](#%EC%97%B0%EC%82%B0-%EA%B3%BC%EC%A0%95%EC%97%90%EC%84%9C-%EC%82%AC%EC%9A%A9%EB%90%9C-%EB%A9%94%EB%AA%A8%EB%A6%AC%EB%A5%BC-%EC%B8%A1%EC%A0%95%ED%95%9C-%EC%84%B1%EB%8A%A5-%EB%B9%84%EA%B5%90)
  - [2-3. 가상환경으로 사용자의 코드를 격리하여 실행하는 방법](#2-3-%EA%B0%80%EC%83%81%ED%99%98%EA%B2%BD%EC%9C%BC%EB%A1%9C-%EC%82%AC%EC%9A%A9%EC%9E%90%EC%9D%98-%EC%BD%94%EB%93%9C%EB%A5%BC-%EA%B2%A9%EB%A6%AC%ED%95%98%EC%97%AC-%EC%8B%A4%ED%96%89%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95)
    - [1. 자바스크립트 내 격리](#1-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%82%B4-%EA%B2%A9%EB%A6%AC)
    - [2. 운영체제 수준의 격리](#2-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C-%EC%88%98%EC%A4%80%EC%9D%98-%EA%B2%A9%EB%A6%AC)
  - [2-4. 동시성 문제, I/O 과부하 문제](#2-4-%EB%8F%99%EC%8B%9C%EC%84%B1-%EB%AC%B8%EC%A0%9C-io-%EA%B3%BC%EB%B6%80%ED%95%98-%EB%AC%B8%EC%A0%9C)
  - [2-5. 결과 공유를 위한 PostgreSQL기반 데이터 저장 방법](#2-5-%EA%B2%B0%EA%B3%BC-%EA%B3%B5%EC%9C%A0%EB%A5%BC-%EC%9C%84%ED%95%9C-postgresql%EA%B8%B0%EB%B0%98-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%80%EC%9E%A5-%EB%B0%A9%EB%B2%95)
- [3. 프로젝트 협업 과정](#3-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%ED%98%91%EC%97%85-%EA%B3%BC%EC%A0%95)
  - [3-1. 같은 목표부터 바라보기](#3-1-%EA%B0%99%EC%9D%80-%EB%AA%A9%ED%91%9C%EB%B6%80%ED%84%B0-%EB%B0%94%EB%9D%BC%EB%B3%B4%EA%B8%B0)
  - [3-2. 의사 결정 방식](#3-2-%EC%9D%98%EC%82%AC-%EA%B2%B0%EC%A0%95-%EB%B0%A9%EC%8B%9D)
- [4. 팀원 소개](#4-%ED%8C%80%EC%9B%90-%EC%86%8C%EA%B0%9C)

<!-- tocstop -->

<br><br>

# 1. 프로젝트 소개

## 1-1. 기획 동기

웹 개발에 익숙한 자바스크립트로 웹어셈블리 모듈을 생성할 수 있을까요?

보통 C나 C++로부터 모듈화하는 웹어셈블리를 자바스크립트 코드로 생성할 수 있을까 하는 아이디어에서 시작해 웹어셈블리 생성이 가능한 언어 중 어셈블리스크립트도 있다는 것을 알게 되었고, 이를 통해 자바스크립트 코드에서 어셈블리스크립트를 거쳐 웹어셈블리를 생성하여 성능을 비교하여 시각화해보고자 했습니다.

이러한 웹어셈블리의 장점을 활용해 자바스크립트코드가 웹어셈블리로 변환될 때 성능이 얼마나 향상될 수 있는지 직접적으로 보여주는 도구를 구현해 보고자 했습니다.

![AS 트랜스파일, WASM 컴파일](https://github.com/user-attachments/assets/a2d086d6-698a-4d24-8e68-d0a106ef183f)

<details>
  <summary>웹어셈블리란? </summary>
    <div markdown="2">
  웹어셈블리(WASM)는 브라우저 내에서 네이티브 성능에 가까운 속도로 실행될 수 있는 기술로, 특히 복잡한 연산이나 대량의 데이터를 처리할 때 자바스크립트보다 훨씬 빠르게 실행됩니다. 웹에서의 속도는 사용자 경험에 큰 영향을 미치는데, 특히 반응 속도나 페이지 로딩 시간을 줄여 더 빠른 상호작용이 가능하게 됩니다.
    </div>
</details>
<br><br>

## 1-2. 개발 환경

성능을 비교하고 결과 내용을 렌더링하는 방법에는 **Next.js를 사용하여 구현**했습니다.

Next.js는 풀스택 프레임워크로, 클라이언트와 서버에서 모두 작업할 수 있는 통합적인 환경을 제공하여 성능 최적화와 서버 사이드 데이터 패칭을 보다 쉽게 구현할 수 있고, 클라이언트와 서버 간의 원활한 데이터 통신을 가능하게 합니다. 이러한 특징 덕분에, SSR을 활용한 성능 비교 결과 공유 기능을 효율적으로 구축할 수 있었습니다.

| ![csr](https://github.com/user-attachments/assets/4683c0c3-4a65-4c7a-be7c-7846bb2baa60) | ![SSR](https://github.com/user-attachments/assets/a1f0a2a2-9c0c-4779-bd99-aaba9da0de9c) |
| --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| **[CSR]**                                                                               | **[SSR]**                                                                               |

SSR 방식을 사용한 이유는 성능 비교 결과가 정적 페이지 형태로 제공되어, 클라이언트 측에서 추가 로딩이 필요 없이 즉각적으로 표시될 수 있기 때문입니다. 이를 통해 사용자에게 빠르고 원활한 결과 화면을 제공할 수 있으며, 공유된 링크나 HTML 블럭을 어디서든 동일한 결과를 쉽게 확인할 수 있는 장점이 있습니다.

만약 React로만 구현할 경우 클라이언트 사이드에서만 렌더링이 이루어져, SSR 방식으로 제공하는데 한계가 있었습니다.

이를 해결하기 위해 조사하던 중 [React Server Components](https://ko.react.dev/reference/rsc/server-components)에 대해 알게 되었는데, 가장 적절한 방법이라는 생각이 들었습니다. React Server Components는 서버에서 먼저 일부 컴포넌트를 렌더링하여 클라이언트로 전송하고, 클라이언트는 그 데이터를 받아 필요한 부분만 렌더링을 완료하는 방식입니다.

이 기능을 구현하는 데에는 Next.js 14가가 적합하다고 판단했습니다. Next.js 14는 React Server Components와의 완벽한 통합을 제공하며, SSR뿐만 아니라 데이터 패칭 최적화와 빌드 효율성도 크게 개선되어 이를 통해 성능 비교 결과를 보다 효율적으로 렌더링하고, 다른 사용자와 쉽게 공유할 수 있는 시스템을 구축할 수 있었습니다.

<br><br>

# 2. 구현 사항

## 2-1. 자바스크립트를 어셈블리스크립트로, 어셈블리스크립트를 웹어셈블리로

### [1] 어셈블리스크립트로 트랜스파일, 웹어셈블리로 컴파일

대량의 데이터를 다루기 전, 구현이 가능한지 확인해보고자 먼저 간단한 알고리즘함수를 변환해보는 작업부터 시작했습니다.

어셈블리스크립트는 타입스크립트를 기반으로 만들어진 언어로 자바스크립트와 동일한 코드 구조에서 타입추론이 부여되어 있는 형태로 작성됩니다. 따라서 자바스크립트 코드를 추상구문트리로 변환하여 변수, 반환값 등 타입 추론이 필요한 부분에 타입을 적어넣어 생성할 수 있도록 코드를 작성했습니다.

```javascript
/*
* add함수에 대한 AST 생성 및 타입부여 방법
*
*function add (a, b) {
*  return a + b;
*}
*/

// add함수로 생성한 추상구문트리
File
└─ program
    └─ sourceType: 'script'
        └─ 함수 선언부(function)
            ├─ id: 식별자 (name: 'add')
            ├─ 매개변수
            │   ├─ 식별자 (name: 'a') // 타입 부여
            │   └─ 식별자 (name: 'b') // 타입 부여
            └─ body: 블록문
                    └─ 반환문(return) // 타입 부여
                        └─ 인자: 이항 연산식
                            ├─ 왼쪽 피연산자: 식별자 (name: 'a')
                            ├─ 연산자: '+'
                            └─ 오른쪽 피연산자: 식별자 (name: 'b')

```

<br>

추상구문트리를 순회하며 타입 선언이 필요한 위치마다 타입을 부여하여 입력한 자바스크립트 코드를 어셈블리스크립트로 트랜스파일이 가능했습니다.

<br>

| 입력한 자바스크립트 코드                                                                  | AST를 순회하며 트랜스파일링된 어셈블리스크립트 코드                                       |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| ![image](https://github.com/user-attachments/assets/7c6b20e7-9b95-41ac-95e5-5cc82f00b691) | ![image](https://github.com/user-attachments/assets/3fa21b62-504e-45d3-82be-d2787f57ba58) |

<br>

그리고 어셈블리스크립트의 내장 컴파일러에 있는 웹어셈블리 빌드 기능으로 웹어셈블리 모듈을 컴파일하였습니다.

해당 기능은 cli로 구현이 가능했습니다.

<br>

```
npx asc ${어셈블리스크립트 코드 위치} --outFile ${웹어셈블리 모듈 생성위치} --optimize
```

<br><br>

### [2] 모든 자바스크립트 자료형을 어셈블리스크립트로 변환할 수 있을까?

답은 **그렇지 않다**입니다.

결론적으로 프로젝트 기간 중 **원시값** 자료형만 구현하여 지원하게 되었습니다.

어셈블리스크립트의 문법은 타입스크립트와 유사하여 처음에는 두 언어를 비슷하게 이해하고 접근할 수 있습니다. 하지만 사실 이 두 언어는 문법적으로만 비슷할 뿐, **다른 언어**입니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/41ef9c4c-53b7-4e04-a455-49dd831b4326" width="300rem"/>

</div>

타입스크립트는 자바스크립트의 상위 집합으로, 자바스크립트로 컴파일되기 때문에 모든 자바스크립트 코드를 타입스크립트로 표현할 수 있습니다.

반면, 어셈블리스크립트는 웹어셈블리로 컴파일되며, 웹어셈블리는 정적 타입 정보에 크게 의존하기 때문에 어셈블리스크립트에서 사용하는 자료형은 자바스크립트와 다릅니다.

즉, 두 언어는 구문의 추상화 정도는 비슷하다 할 수 있지만, 사용 의도가 확연히 다른 언어이기에 타입스크립트처럼 모든 자바스크립트 문법을 표현할 수 있지는 않았습니다.

#### 메모리 관리 방식의 차이

자바스크립트에서 사용하는 객체나 배열은 동적으로 할당된 메모리 영역에 위치하는데, 이 영역의 주소(포인터)를 직접 웹어셈블리로 전달해야 합니다.

그러나 자바스크립트는 가비지 컬렉션(Garbage Collection, GC)을 통해 메모리를 동적으로 관리하는 반면, 웹어셈블리는 정적으로 할당된 메모리를 사용하며(linear memory) 수동으로 메모리를 관리해야 합니다. 이 차이로 인해 복잡한 자료형, 특히 참조형 자료(객체, 배열 등)를 전달하거나 변환하는 데 어려움이 생깁니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/2698f143-17bc-4098-af29-7babf898ccfa" width="300rem"/>

_자바스크립트 자료형을 웹어셈블리 메모리에 전달해야 합니다._

<span style="font-size:70%">출처: http<hi>s://hacks.mozilla.org/2018/06/babys-first-rustwebassembly-module-say-hi-to-jsconf-eu
</span>

</div>

<br>

예를들어 자바스크립트의 객체는 키-값 쌍으로 이루어진 동적 구조이지만, 웹어셈블리는 정적 타입을 요구하기 때문에 이를 변환하려면 객체를 정적인 데이터 구조(예: 클래스나 Map)로 변환하거나, 별도의 데이터 직렬화 방식(예: JSON)을 사용해야 합니다.

<br>

#### 원시값 변환이 가능했던 이유

원시값은 고정된 타입을 가지기 때문에, 메모리에서의 표현 방식이 자바스크립트와 웹어셈블리 간에 비교적 일관됩니다. 예를 들어, 정수(`i32`)나 부동소수점(`f64`) 값은 자바스크립트에서 웹어셈블리로 그대로 전달될 수 있으며, 메모리 상에서 특별한 처리를 필요로 하지 않습니다.

따라서 원시값은 메모리 주소를 추적하거나 복잡한 메모리 구조를 다룰 필요가 없기 때문에, 자바스크립트와 어셈블리스크립트 간의 변환이 쉽고 성능도 높게 유지됩니다.

결국, 참조형 자료의 변환은 메모리 관리 및 타입의 차이로 인해 복잡성을 동반하지만, 원시값은 이러한 복잡성 없이 일관되게 처리될 수 있습니다. 이로 인해 프로젝트 기간 동안 원시값에 집중하여 지원하게 되었습니다.

<br><br>

## 2-2. 자바스크립트 코드와 웹 어셈블리 모듈 간의 성능 비교 방법

성능 비교에서 중요한 것은 <u>어떤 요소를 측정할 것인지</u>였습니다.

웹 어셈블리는 브라우저 내에서 네이티브 성능에 가까운 속도로 실행될 수 있는 기술이기 때문에 원본 코드에 비해 얼마나 성능이 향상되는지 비교하는 것이 적합하다고 생각했고,
따라서 **초당 실행 횟수**를 기준으로 성능을 비교하는 방법을 구현하였습니다.

### 초당 실행 횟수를 측정한 성능 비교

먼저 접근 했던 방법은 연산 실행 속도를 측정하여 비교하는 방법이였고 반복된 측정 결과의 평균 실행 속도를 비교하고자 하였습니다.

간단한 알고리즘 함수를 대상으로 작업하고 있었기 때문에 자바스크립트 코드와 웹 어셈블리 모듈의 측정 결과는 약 0.0007ms 정도의 매우 작은 수치로 측정되었고,
이 결과는 사용자에게 충분히 전달되지 않을 것이라 판단되어 어떻게 하면 결과를 더 명확하게 표현할 수 있을지 고민하게 되었습니다.

고민을 해결하기 위한 다양한 방법을 모색하던 중, 과거에 많은 사람들이 사용하던 [jsPerf](https://jsperf.app/)라는 사이트에서 사용하던 성능 분석 방법인 1초 동안 해당 로직을 연속 실행하여 몇 번 실행되는지를 기준으로 성능을 비교하는 방법을 발견하게 되었습니다.

이 방법은 작은 수치로 측정된 차이를 보다 명확하게 보여줄 수 있는 방법으로 적합하다고 판단했고, 자바스크립트의 런타임을 제공하는 Node.js에서 퍼포먼스 API 중 [`performance.now` 메서드](https://nodejs.org/docs/latest-v18.x/api/perf_hooks.html#performancenow)를 사용하여 초당 연산 횟수 측정 로직을 구현할 수 있었습니다.

```javascript
  // 초당 연산 횟수 측정 내부 로직

  시작_타임스탬프 = performance.now();
  초당_반복_실행된_횟수 = 0;

  while (performance.now() - 시작_타임스탬프 < 측정할_초) {
    측정_대상_로직(); // 자바스크립트 알고리즘 함수 코드 또는 웹 어셈블리 모듈

    초당_반복_실행된_횟수 1 증가;
  }

  return 초당_반복_실행된_횟수;
```

<br>

또한 사용자에게 보다 명확하고 의미있는 성능 비교 차이를 표현할 수 있었습니다.

<br>

![report](https://github.com/user-attachments/assets/a3b03e7d-1912-4493-8027-e8692db49dc1)

> 막대차트를 통해 1초당 실행횟수의 차이를 시각적으로 한 번 표시해주고, 추가로 이 실행횟수의 차이를 숫자로 한 번 더 표시해주어 조금 더 직관적으로 인식할 수 있도록 결과 리포트를 구성했습니다.

<br>

### 연산 과정에서 사용된 메모리를 측정한 성능 비교

초당 실행 횟수를 측정한 성능 비교 외에 사용된 메모리를 측정하여 비교하는 방법을 구상하기도 하였습니다.

흔히 메모리라고 하는 RAM(Random Access Memory)은 Stack, Heap, 코드, 데이터 등 다양한 영역으로 나뉘며 Node.js가 사용하는 V8 엔진에서 관리하고 있는 메모리는 크게 스택(Stack)과 힙(Heap)이 있습니다.

|                             스택 Stack                              |                                     힙 Heap                                     |
| :-----------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| 로컬 변수, 포인터, 원시값 등을 포함한 정적 데이터가 저장되는 메모리 | 전역 변수, 객체, 문자열 등 복잡한 데이터를 포함한 동적 데이터가 저장되는 메모리 |

성능 비교을 위해 사용된 메모리를 측정하는 것은 연산 과정에서 스택 메모리와 힙 메모리의 사용량을 측정해야한다는 것이 였습니다.

사용된 메모리를 측정하기 위해선 자바스크립트의 런타임을 제공하는 Node.js에서 메모리를 측정할 수 있는 [`process.memoryUsage` 메서드](https://nodejs.org/docs/latest-v18.x/api/process.html#processmemoryusage)를 활용할 수 있었으나, `process.memoryUsage` 메서드가 반환하는 값에서는 힙 메모리의 사용량과 크기를 반환하지만 스택 메모리의 사용량과 크기를 반환하지 않았습니다.

현재 프로젝트는 원시값 자료형만 구현하여 지원하기 때문에 정적 데이터가 저장되는 스택 메모리를 측정하는 것이 주요했고, '**측정하고자 했던 스택 메모리의 사용량을 정확하게 추적하는 것에는 한계가 있다.**' 는 것으로 판단되어 연산 과정에서 사용된 메모리를 측정하는 방법은 적합하지 않았습니다.

<br><br>

## 2-3. 가상환경으로 사용자의 코드를 격리하여 실행하는 방법

> 사용자의 코드를 격리하고 프로젝트를 보호하기 위해 **isolated-vm**과 **도커**를 도입하였습니다.

사용자의 코드를 실행하는것은 여러가지 위험성을 내포하고 있습니다.

무한루프나 의도적으로 비효율적인 코드를 만들어 서버의 CPU를 과도하게 사용하게 하는 **서비스 거부 공격(Dos)** 이나 시스템 권한을 의도적으로 상승시켜 데이터를 유출하는 **권한 상승 공격**이 대표적인 예입니다.

이러한 위험으로부터 프로젝트를 보호하기 위해 **격리된 환경**을 두 가지 방식으로 구현했습니다.

### 1. 자바스크립트 내 격리

사용자 코드가 무한 루프를 유발하거나 의도적으로 비효율적인 코드를 실행하는 경우를 대비해, **isolated-vm**라이브러리를 사용하여 코드를 별도의 가상환경에서 실행합니다.

isolated-vm은 자바스크립트 코드 실행을 격리하고, 제한된 자원 내에서만 동작하게 하여 서버 자원을 과도하게 사용하는 상황을 방지할 수 있습니다. 만약 예상치 못한 에러가 발생하거나 무한 루프에 빠질 경우, 해당 실행 컨텍스트를 즉시 종료함으로써 서버의 안정성을 유지합니다.

### 2. 운영체제 수준의 격리

이와 더불어 **도커**를 활용하여 사용자 코드를 실행하는 환경을 운영체제 차원에서 격리하였습니다. 도커는 사용자의 코드가 호스트 운영체제와 분리된 프로세스 내에서 실행되도록 해, 시스템 권한 상승 공격을 방지합니다. 도커를 통해 실행한 프로세스는 독립된 리소스를 할당받아 실행되며, 문제가 발생하면 해당 프로세스만 종료하거나 재시작할 수 있습니다.

<br>

<div align="center">
  <img src="https://github.com/user-attachments/assets/9dffa476-7e4d-44bb-8e01-b097ec7f2066" width="300rem"/>

_isolated-vm과 도커를 통한 사용자 코드 환경 분리_

</div>

<br><br>

## 2-4. 동시성 문제, I/O 과부하 문제

클라이언트에서 성능 비교 요청을 하게되면. 유저의 자바스크립트 코드를 변환하는 과정에서 어셈블리스크립트 파일과 웹어셈블리 파일을 생성하고, 성능을 비교한 뒤 해당 파일들을 삭제하게 됩니다.

이러한 로직이 개발단계에선 문제가 없었지만 **프로젝트를 배포하고 많은 사용자가 이용하게 될 경우 서버에 부담이 되지 않을까?** 하는 의구심에 조사를 하게 되었습니다.

매 요청 시 서버에서 파일을 생성하고 삭제하는 로직은 두 가지 위험성을 내포하고 있습니다.

1. **동시성 문제**: 다수의 사용자가 동시에 요청할 경우, 같은 파일에 대해 여러 요청이 동시에 처리되면서 충돌이나 데이터 손상이 발생할 수 있습니다. 이로 인해 파일이 제대로 생성되거나 삭제되지 않거나, 다른 사용자의 파일에 의도치 않게 접근하는 문제가 발생할 수 있습니다.

2. **I/O 작업 부하**: 매 요청마다 파일을 생성하고 삭제하는 것은 디스크 I/O를 과도하게 사용하게 되어 서버 성능에 부정적인 영향을 미칠 수 있습니다. 특히 빈번한 요청이 있을 경우, 파일 시스템의 처리 용량을 초과하게 되어 성능 저하나 응답 시간 지연이 발생할 수 있습니다.

팀원과의 회의 끝에 어셈블리스크립트 Compiler를 사용하여 파일을 생성하지 않고 웹어셈블리를 생성하는 방식으로 로직의 흐름을 바꾸었는데요. 이 과정에서 문제가 발생하였습니다.

어셈블리스크립트 Compiler는 내부적으로 `binaryen`을 사용하여 웹어셈블리로 컴파일 합니다. 이를 import 하는 과정에서 알 수 없는 타입 에러가 발생하였고, webpack을 통해 번들된 코드에서 문제가 발생하는것은 파악하였지만 정확한 원인과 해결책을 찾지 못하였습니다.

<div align="center">
  <img src="https://github.com/user-attachments/assets/75034186-7b55-4b22-8a53-c170f9b391ab" width="500rem"/>

_알 수 없는 타입 에러_

</div>

약 이틀간 문제를 해결하기 위해 노력하였지만 프로젝트의 남은 기간을 고려하여 결과적으로 서버에서 파일을 생성하고 삭제하지만 `tmp`모듈을 사용하여 서버 안정성을 확보하는 방향으로 프로젝트를 구현하였습니다.

<br><br><br>

## 2-5. 결과 공유를 위한 PostgreSQL기반 데이터 저장 방법

성능 비교 결과를 다른 사람과 쉽게 공유하기 위해서는 데이터를 안전하고 빠르게 저장할 필요가 있었습니다. 복잡한 설정 없이 가볍고 신뢰성있는 방법을 찾다가, Supabase와 Prisma를 선택하게 되었습니다. Supabase는 Postgres 기반 서버리스 백엔드로, 실시간 데이터 저장 및 조회 기능을 제공해 성능 비교 결과를 즉시 저장하고, UUID 기반 고유 링크로 공유할 수 있게 해줍니다.

Supabase의 RESTful API 자동 생성 기능이 있어 복잡한 API를 별도로 설계할 필요 없이 빠르게 시스템을 구축할 수 있었고, Prisma는 타입 안전성과 간단한 쿼리 작성을 통해 안전하고 유연한 데이터 관리를 가능하게 했습니다. 이 결합 덕분에 성능 비교 결과를 신속하게 저장하고, "measurement-result/{UUID}" 형식의 링크로 쉽게 공유할 수 있는 최적의 솔루션을 제공할 수 있었습니다.

결과적으로 Supabase와 Prisma의 조합으로 사용자 경험을 향상시키는 안전하고 확장 가능한 성능 비교 결과 공유 시스템을 구축할 수 있었습니다.

<br><br><br>

# 3. 프로젝트 협업 과정

## 3-1. 같은 목표부터 바라보기

> 목표(Goal)는 도달해야할 한 지점입니다. 이 목표를 한 발, 한 발 맞춰가면서 함께 목적(Purpose)을 이뤄 갔습니다.
>
> 웹 개발에서의 작은 단위의 목표는 하나의 작업 완성일 것입니다.
>
> 완성된 작업을 하나 하나 맞춰가며 함께 프로젝트 완성이라는 목적을 이뤄 갔습니다.

<br>

**좋은 협업**'은 여러 표현으로 정의될 수 있는 주제입니다만, 저희 팀의 프로젝트 협업 과정을 돌아봤을 때 **좋은 협업**은 '**같은 목표**'였다고 생각합니다.

협업 과정에서 보통 중요하게 생각하는 **의사소통**은 생각이나 의견을 적극적으로 어필하는 것으로 간단하게 정의할 수 있을텐데, 저희는 그렇게 적극적으로 의사표현을 하는 것 만큼이나 같은 목표로 뜻을 합치하는 데에 많은 시간을 사용했습니다.

의견을 합치하기 위해 단순히 대화만 많이 하는 것에 멈추지 않고 여러 도구들을 사용해 프로젝트를 구체화하고 큰 그림부터 세밀한 스케치까지 맞춰 그려갔습니다.

![IMG_6160](https://github.com/user-attachments/assets/461003a4-0764-436b-b10b-c856aa8b1390)

> 프로젝트 초기 기획도 함께 논의하며 POC(Proof Of Concept)과정을 진행했습니다.

또한 함께 논의하고 정리한 내용을 공유하기 위해 노션(협업 일지), 피그마(플로우차트, 와이어프레임)으로 꾸준히 목표를 정렬하는 노력을 했습니다.

<br>

| <img width="220" height="120" alt="calendar" src="https://github.com/user-attachments/assets/9939c3be-7c46-4b23-afd7-cefbea7e2a9c"> | <img width="220" height="120" alt="meeting-list" src="https://github.com/user-attachments/assets/d0031bde-af4d-4f91-b692-786f3e4cd36a"> | <img width="220" height="120" alt="wire-frame" src="https://github.com/user-attachments/assets/59355207-0f52-4a08-aaf8-6e748cdddcca">                                                                                                    | <img width="220" height="120" alt="flow-chart" src="https://github.com/user-attachments/assets/64343997-b4ad-4e61-9ce7-f3c1abc9aada">                                                                                        |
| ----------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [칸반 달력(노션)](https://www.notion.so/4723c1e72a204de28e7f672f81ed8c1c?v=403e91cf421444bfaa5ea6f8dcc35895&pvs=4)                  | [회의록(노션)](https://www.notion.so/f0c024da288e4d23a9eb3d64f9339e90?v=daaa7c36f9074f10b2d1cd1b8d2da40c&pvs=4)                         | [와이어 프레임(피그마)](https://www.figma.com/design/89I0fpAkKoouJtdmyZIn4R/%EC%96%B4%EC%85%88%EB%B8%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8---%EC%99%80%EC%9D%B4%EC%96%B4-%ED%94%84%EB%A0%88%EC%9E%84?node-id=0-1&t=EXmDlV6LT8rBSUtm-0) | [플로우 차트(피그마)](https://www.figma.com/board/eVeggvj2w97jhRvYtacuCB/%EC%96%B4%EC%85%88%EB%B8%94-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8---%ED%94%8C%EB%A1%9C%EC%9A%B0-%EC%B0%A8%ED%8A%B8?node-id=0-1&t=bQpEj2a97CB9wHyN-0) |

<br>

이를 통해 서로 다른 작업을 하더라도 어떤 작업이 진행중인지 인지하고, 작업 계획과 방향에 맞춰 트러블 없이 프로젝트를 완성해갔습니다.

<br>

## 3-2. 의사 결정 방식

> 매 순간 작은 의견이라도 귀 기울여 듣고, 기록을 남기고, 직접 참여하여 작업의 흐름에서 한 사람도 소외되지 않게 했습니다.

저희 팀의 의사결정 방식은 **"만장일치"** 였습니다.

소수의 인원이기에 가능했던 방법이었을 수도 있지만, 오히려 소수이기에 더 첨예했습니다.

구성원 모두 **합의**를 중시했기에 선택된 방식이기도 했지만, 그보다 **최선의 선택**을 항상 염두에 두며 이 프로젝트에 적극적이었기에 가장 적합했던 의사 결정 방식이었다고 생각합니다.

만장일치 의사결정 방식의 특징은 2가지였다고 생각합니다.

- 본인의 의견에 동의하게 하려면 본인의 의견을 명확하고 조리있게 잘 설명할 수 있어야 합니다.
- 다른 사람의 의견에 동의를 하려면 잘 경청하고 이해해야 합니다.

덕분에 저희 팀의 회의에는 이런 문화도 있었습니다.

- 회의 전, 꼭 어필해야할 의견이 있다면 미리 회의록에 작성해서, 다른 팀원이 인지할 수 있도록 했습니다.
- 정리되지 않은 채 의견을 전달하다보면 전달력이 안 좋을 수 있으니, 의견을 말할 때 스스로 회의록에 자기의 의사를 적어가며 발언했습니다.

<br>

| ![image](https://github.com/user-attachments/assets/6165c9fa-a774-47d9-aea5-5447a1766e6b) |
| ----------------------------------------------------------------------------------------- |
| 회의 전 미리 안건 작성                                                                    |

| ![image](https://github.com/user-attachments/assets/2abcbf1e-72dd-463e-9f64-ce34988fb80f) |
| ----------------------------------------------------------------------------------------- |
| 의사를 적어가며 발언                                                                      |

<br>

이러한 특징 덕분에 매 회의시간이 허투로 흘러가지 않고, 더 나아가 회의를 미리 준비하기도 했으며, 의견을 말할 때에는 스스로 회의록에 자기의 의사를 적어가며 혹여나 잘 못 전달되지 않도록 주의를 기울였습니다.

경우에 따라 어떤 때는 리더쉽을, 어떤 때는 팔로우쉽을 서로 발휘하며 서로의 의견을 존중하며 작업을 진행하였고, 끊임없는 피드백과 논의를 통해 우리는 더 나은 방향으로 나아가고, 더 나은 결과를 얻을 수 있었다고 생각합니다.

이 과정으로 인해 개발 분야에서의 진정한 협업의 의미를 체감할 수 있었다고 생각합니다.

# 4. 팀원 소개

배종범 https://github.com/jongbaaam <br>
정의성 https://github.com/allansad <br>
이창희 https://github.com/heestolee
