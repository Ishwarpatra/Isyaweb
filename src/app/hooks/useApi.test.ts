import { renderHook, waitFor } from '@testing-library/react';
import { useApi } from './useApi';
import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

describe('useApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch data successfully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [{ id: 1, title: 'Test Blog' }],
        pagination: { page: 1, limit: 6, total: 1, pages: 1 },
      }),
    });

    const { result } = renderHook(() => useApi('/api/blogs'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.error).toBeNull();
  });

  it('should retry on 500 error', async () => {
    (global.fetch as any)
      .mockResolvedValueOnce({ ok: false, status: 500, statusText: 'Server Error' })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [] }),
      });

    const { result } = renderHook(() => useApi('/api/blogs'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect((global.fetch as any).mock.calls.length).toBeGreaterThan(1);
  });

  it('should not retry on 400 error', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ error: 'Validation failed' }),
    });

    const { result } = renderHook(() => useApi('/api/blogs'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeDefined();
    expect((global.fetch as any).mock.calls.length).toBe(1); // No retries
  });
});
