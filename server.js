import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import getCompanies from './src/routes/getCompanies.js';
import getUsers from './src/routes/getUsers.js';
import getLatestSelections from './src/routes/getLatestSelections.js';

dotenv.config();
export const app = express();
// 모든 url에 대해 cors설정
app.use(cors());
// 앱 전체에서 express.json()을 사용하겠다는 의미
app.use(express.json());
// req의 content-type이 application/json이면 이를 parsing해서 req body에 js객체로 담아줌)
app.use(bodyParser.json());

/**
 * API 라우터(/src/routes에 작성한 API파일을 이곳에 연결)
 */
// 전체 기업 목록 조회(조형민)
app.use('/api', getCompanies);
// 전체 사용자 목록 조회(조형민)
app.use('/api', getUsers);
// 특정 사용자의 최근 선택 기업 목록 조회(조형민)
app.use('/api', getLatestSelections);

app.listen(process.env.PORT || 5500, () => console.log('Server Started'));
