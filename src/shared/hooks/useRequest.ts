/**
 * 1. Параметры хука:
• request: Функция, выполняющая асинхронный запрос и возвращающая Promise<Response>.
• autoRun (по умолчанию true): Булево значение, определяющее, следует ли запускать запрос сразу после монтирования.
• defaultParams (опционально): Начальные параметры для запроса, если autoRun = true.
2. Возвращаемые значения:
• isLoading: boolean – Состояние загрузки (true во время выполнения запроса, false после завершения).
• request: (params) => Promise<Response> – Функция, выполняющая запрос с переданными параметрами.
• data: Response | null – Полученные данные после успешного запроса.
• error: Error | null – Ошибка, если запрос завершился неудачно.
3. Логика работы:
• При вызове request(params) хук должен устанавливать isLoading = true, выполнять переданный request, сохранять результат в data и обрабатывать ошибки.
• Если autoRun = true, запрос должен запускаться автоматически при монтировании компонента.
 */

/* eslint-disable no-unused-vars */

import { useEffect, useState, useCallback } from 'react';
// import { useErrorStore } from '../Stores';

interface useRequestParams {
  defaultParams?: any,
  autoRun?: boolean,
  request: (params: any) => Promise<Response>,
}

function useRequest({
  request,
  autoRun = true,
  defaultParams,
}: useRequestParams) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { setError } = useErrorStore();

  const requestHandler = useCallback(async (params: any) => {
    // setError(null);
    setIsLoading(true);

    try {
      const response = await request(params);
      setData(response);
      return response;
    } catch (err) {
      // setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [request]);

  useEffect(() => {
    if (!autoRun) return;

    requestHandler(defaultParams);
  }, [autoRun, defaultParams, requestHandler]);

  return { isLoading, request: requestHandler, data };
}

export default useRequest;
