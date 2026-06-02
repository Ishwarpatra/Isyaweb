import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './useAuth';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should check auth on mount', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
          created_at: '2026-06-02T00:00:00Z',
        },
      }),
    });

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
      expect(result.current.user?.email).toBe('test@example.com');
    });
  });

  it('should login with credentials', async () => {
    // 1. Mock me check (initial mount - fails to log in)
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Unauthorized' }),
    });
    // 2. Mock login call (succeeds)
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          role: 'user',
          created_at: '2026-06-02T00:00:00Z',
        },
      }),
    });

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for provider to mount after failing initial me check
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let loginSuccess = false;
    await act(async () => {
      loginSuccess = await result.current.login('test@example.com', 'Test@12345');
    });

    expect(loginSuccess).toBe(true);
    expect(result.current.user?.email).toBe('test@example.com');
  });

  it('should return false on failed login', async () => {
    // 1. Mock me check (initial mount - fails to log in)
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Unauthorized' }),
    });
    // 2. Mock login call (fails)
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid credentials' }),
    });

    const wrapper = ({ children }: any) => <AuthProvider>{children}</AuthProvider>;
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for provider to mount after failing initial me check
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    let loginSuccess = false;
    await act(async () => {
      loginSuccess = await result.current.login('test@example.com', 'wrong');
    });

    expect(loginSuccess).toBe(false);
  });
});
