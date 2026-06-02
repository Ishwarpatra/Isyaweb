import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { BlogPage } from './BlogPage';
import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

describe('BlogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    (global.fetch as any).mockImplementationOnce(() => new Promise(() => {})); // Never resolves

    render(
      <BrowserRouter>
        <BlogPage />
      </BrowserRouter>
    );

    expect(screen.getByText(/ESTABLISHING_DATALINK/i)).toBeInTheDocument();
  });

  it('should render blog posts', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [
          {
            id: 1,
            title: 'Test Blog',
            excerpt: 'Test excerpt',
            image: 'https://...',
            category: 'RESEARCH',
            author_id: 1,
            author_name: 'Author',
            published_at: '2026-06-02T00:00:00Z',
            view_count: 10,
          },
        ],
        pagination: { page: 1, limit: 6, total: 1, pages: 1 },
      }),
    });

    render(
      <BrowserRouter>
        <BlogPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Test Blog')).toBeInTheDocument();
    });
  });

  it('should render empty state', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: [],
        pagination: { page: 1, limit: 6, total: 0, pages: 0 },
      }),
    });

    render(
      <BrowserRouter>
        <BlogPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/BUFFER_EMPTY/i)).toBeInTheDocument();
    });
  });
});
