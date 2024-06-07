import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CaptchaResult, LoginData, LoginResult } from '@/api/auth/types';

export const login = (data: LoginData): AxiosPromise<LoginResult> =>
  request({
    method: 'post',
    url: '/v1/api/auth/login',
    data: data
  });

export const getUserInfo = (accessToken: string) =>
  request({
    method: 'get',
    url: '/v1/api/user/info',
    params: { accessToken }
  });

export const logout = () =>
  request({
    method: 'post',
    url: '/v1/api/auth/logout'
  });

export const getCaptchaApi = (): AxiosPromise<CaptchaResult> =>
  request({
    method: 'get',
    url: '/v1/api/auth/captcha'
  });
