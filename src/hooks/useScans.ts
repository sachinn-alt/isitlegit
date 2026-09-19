import { useState, useEffect, useCallback } from 'react';
import { db } from '@/db/database';
import { ScanRecord, ScanType, ThreatLevel } from '@/types';

export function useScans() {
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<ScanType | 'all'>('all');
  const [filterVerdict, setFilterVerdict] = useState<ThreatLevel | 'all'>('all');
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const loadScans = useCallback(async () => {
    try {
      setLoading(true);
      const allScans = await db.scans.reverse().sortBy('createdAt');
      setScans(allScans);
    } catch (err) {
      console.error('Failed to load scans:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadScans();
  }, [loadScans]);

  const toggleBookmark = async (id: string) => {
    const item = await db.scans.get(id);
    if (item) {
      await db.scans.update(id, { bookmarked: !item.bookmarked });
      await loadScans();
    }
  };

  const deleteScan = async (id: string) => {
    await db.scans.delete(id);
    await loadScans();
  };

  const clearAllScans = async () => {
    await db.scans.clear();
    await loadScans();
  };

  const exportScansAsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(scans, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `isitlegit-scan-history-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredScans = scans.filter((scan) => {
    if (bookmarkedOnly && !scan.bookmarked) return false;
    if (filterType !== 'all' && scan.type !== filterType) return false;
    if (filterVerdict !== 'all' && scan.verdict !== filterVerdict) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesInput = scan.input.toLowerCase().includes(q);
      const matchesSummary = scan.result.summary.toLowerCase().includes(q);
      return matchesInput || matchesSummary;
    }
    return true;
  });

  return {
    scans: filteredScans,
    totalCount: scans.length,
    loading,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterVerdict,
    setFilterVerdict,
    bookmarkedOnly,
    setBookmarkedOnly,
    toggleBookmark,
    deleteScan,
    clearAllScans,
    exportScansAsJson,
    refresh: loadScans,
  };
}
