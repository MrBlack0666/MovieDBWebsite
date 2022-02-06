using BAS.Database;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BAS.Repository.Infrastructure
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly MovieDbContext db;

        public GenericRepository(MovieDbContext db)
        {
            this.db = db;
        }

        public async Task Delete(T entity)
        {
            db.Set<T>().Remove(entity);
        }

        public async Task Delete(long id)
        {
            T entity = await GetById(id);
            _ = Delete(entity);
        }

        public async Task<T> GetById(long id)
        {
            return await db.Set<T>().FindAsync(id);
        }

        public async Task Insert(T entity)
        {
            await db.Set<T>().AddAsync(entity);
        }

        public async Task Update(T entity)
        {
            db.Set<T>().Attach(entity);
            db.Entry<T>(entity).State = EntityState.Modified;
        }

        public IEnumerable<T> GetByPredicate(Func<T, bool> predicate = null, Func<T, object> orderBy = null, bool isDescending = false, int page = 1, int? pageSize = null)
        {
            var items = db.Set<T>().Where(predicate ?? (p => true));

            if (orderBy != null && isDescending)
                items = items.OrderByDescending(orderBy);
            else if(orderBy != null && !isDescending)
                items = items.OrderBy(orderBy);

            if (pageSize == null)
                return items;

            return items.Skip((page - 1) * pageSize.Value).Take(pageSize.Value);
        }

        public async Task<int> Count(Func<T, bool> predicate = null)
        {
            return db.Set<T>().Count(predicate ?? (p => true));
        }
    }
}
